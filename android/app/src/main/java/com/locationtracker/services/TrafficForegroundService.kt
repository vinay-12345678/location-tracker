package com.locationtracker.services

import android.app.*
import android.content.Context
import android.content.Intent
import android.location.Location
import android.os.IBinder
import android.os.Looper
import android.util.Log
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.location.*
import kotlinx.coroutines.*
import org.json.JSONObject
import java.net.URL

class TrafficForegroundService : Service() {

  private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
  private val tomTomKey = "RPWgnpI2b3n1BbDkn1nhcpusYX4GZTDl"
  private lateinit var fusedLocationClient: FusedLocationProviderClient

  private val CHANNEL_ID = "TrafficChannel"
  private val NOTIFICATION_ID = 123

  companion object {
      var reactContext: ReactApplicationContext? = null

      fun sendEvent(event: String, data: String) {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
              ?.emit(event, data)
      }
  }

  override fun onCreate() {
      super.onCreate()
      fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
      createNotificationChannel()
      startForeground(NOTIFICATION_ID, createNotification("Initializing..."))
      startLocationUpdates()
  }

  // alag se channel banaya hai because notification ko android ko dekhna hai
  private fun createNotificationChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            "Traffic Tracking",
            NotificationManager.IMPORTANCE_LOW // it won't make sound or vibrate
        )
        val manager = getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(channel)
    }

  // notification banaya hai
  private fun createNotification(content: String): Notification {
      return NotificationCompat.Builder(this, CHANNEL_ID)
          .setContentTitle("Traffic Advisor")
          .setContentText(content)
          .setSmallIcon(android.R.drawable.ic_menu_mylocation)
          .setOngoing(true)
          .build()
  }

  // notification update karega
  private fun updateNotification(text: String) {
      val manager = getSystemService(NotificationManager::class.java)
      val notification = createNotification(text)
      manager.notify(NOTIFICATION_ID, notification)

      // ✅ Emit message to React Native
      sendEvent("TrafficUpdate", text)
  }

  // location updates start karega
  private fun startLocationUpdates() {
      val locationRequest = LocationRequest.Builder(
          Priority.PRIORITY_BALANCED_POWER_ACCURACY,
          60000L // 1 minute in milliseconds
      ).build()

      fusedLocationClient.requestLocationUpdates(
          locationRequest,
          object : LocationCallback() {
              override fun onLocationResult(result: LocationResult) {
                  result.lastLocation?.let { location ->
                      serviceScope.launch { checkTrafficAndUpdate(location) }
                  }
              }
          },
          Looper.getMainLooper()
      )
  }

  private suspend fun checkTrafficAndUpdate(location: Location) {
      try {
        val latitude = location.latitude
        val longitude = location.longitude
        // val latitude = 28.684794
        // val longitude = 77.065563
        
        Log.d("TrafficService", "📍 Location: lat=$latitude, lng=$longitude")
        
          val urlStr =
              "https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/9/json" + // 9x zoom will be around 200-400 meter
                      "?point=${latitude},${longitude}" +
                      "&unit=KMPH&key=$tomTomKey"

          Log.d("TrafficService", "🌐 API URL: $urlStr")
          
          val response = URL(urlStr).readText()
          Log.d("TrafficService", "📥 API Response: $response")
          
          val json = JSONObject(response)
          val flow = json.getJSONObject("flowSegmentData")
          val currentSpeed = flow.getDouble("currentSpeed")
          val freeFlowSpeed = flow.getDouble("freeFlowSpeed")
          val ratio = currentSpeed / freeFlowSpeed

          Log.d("TrafficService", "🚗 Current Speed: $currentSpeed KMPH")
          Log.d("TrafficService", "🏎️  Free Flow Speed: $freeFlowSpeed KMPH")
          Log.d("TrafficService", "📊 Ratio: $ratio")

          val status = when {
              ratio > 0.95 -> "No traffic, perfect time to go out"
              ratio > 0.8 -> "Less traffic, good time to go out"
              ratio > 0.5 -> "Moderate traffic nearby"
              else -> "Heavy traffic, wait before going out"
          }

          Log.d("TrafficService", "✅ Status: $status")
          
          updateNotification(status)
      } catch (e: Exception) {
          Log.e("TrafficService", "❌ Error checking traffic: ${e.message}")
          updateNotification("Error checking traffic")
          e.printStackTrace()
      }
  }

   override fun onDestroy() {
        serviceScope.cancel()
        fusedLocationClient.removeLocationUpdates(object : LocationCallback() {})
        super.onDestroy()
    }

  override fun onBind(intent: Intent?): IBinder? = null
}

