pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = ("trilium")

enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")

include(
    "app"
)
