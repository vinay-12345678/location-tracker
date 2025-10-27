package com.locationtracker.services

object ServiceConstants {
    // Notification IDs
    const val DEMO_SERVICE_NOTIFICATION_ID = 1
    const val LOCATION_SERVICE_NOTIFICATION_ID = 2
    
    // Notification Channel IDs
    const val DEMO_CHANNEL_ID = "demo_channel"
    const val LOCATION_CHANNEL_ID = "location_tracking_channel"
    
    // Notification Channel Names
    const val DEMO_CHANNEL_NAME = "Demo Foreground Service"
    const val LOCATION_CHANNEL_NAME = "Location Tracking"
    
    // Service Actions
    const val ACTION_START_TRACKING = "com.locationtracker.START_TRACKING"
    const val ACTION_STOP_TRACKING = "com.locationtracker.STOP_TRACKING"
    const val ACTION_PAUSE_TRACKING = "com.locationtracker.PAUSE_TRACKING"
    
    // Intent Extras
    const val EXTRA_TRACKING_INTERVAL = "tracking_interval"
    const val EXTRA_DISTANCE_FILTER = "distance_filter"
}

