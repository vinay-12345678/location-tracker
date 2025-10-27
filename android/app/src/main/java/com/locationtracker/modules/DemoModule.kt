package com.locationtracker.modules

import android.content.Intent
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.locationtracker.services.DemoForegroundService

class DemoModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "DemoModule"

    @ReactMethod
    fun startService() {
        val intent = Intent(reactContext, DemoForegroundService::class.java)
        ContextCompat.startForegroundService(reactContext, intent)
    }

    @ReactMethod
    fun stopService() {
        val intent = Intent(reactContext, DemoForegroundService::class.java)
        reactContext.stopService(intent)
    }
}