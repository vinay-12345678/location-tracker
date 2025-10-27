package com.locationtracker.modules

import android.app.ActivityManager
import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.*

class TrafficServiceModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val context = reactContext

    override fun getName(): String = "TrafficServiceModule"

    @ReactMethod
    fun startService() {
        try {
            // assign react context to service companion
            com.locationtracker.services.TrafficForegroundService.reactContext = context

            val serviceIntent = Intent(context, com.locationtracker.services.TrafficForegroundService::class.java)
            if (!isServiceRunning()) {
                context.startForegroundService(serviceIntent)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    @ReactMethod
    fun stopService() {
        try {
            val serviceIntent = Intent(context, com.locationtracker.services.TrafficForegroundService::class.java)
            context.stopService(serviceIntent)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    @ReactMethod
    fun isServiceRunning(promise: Promise) {
        try {
            val am = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
            val running = am.getRunningServices(Integer.MAX_VALUE)
                .any { it.service.className == com.locationtracker.services.TrafficForegroundService::class.java.name }
            promise.resolve(running)
        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }

    private fun isServiceRunning(): Boolean {
        val am = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        return am.getRunningServices(Integer.MAX_VALUE)
            .any { it.service.className == com.locationtracker.services.TrafficForegroundService::class.java.name }
    }
}
