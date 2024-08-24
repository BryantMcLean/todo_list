export default{
  expo: {
    name: "Todo List",
    owner: "gbmclean64",
    slug: "todo_list",
    version: "1.0.0",
    icon: "./assets/Fallback.png",
    orientation: 'portrait',
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/Fallback.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    plugins: [[
      "expo-notifications",
      {
        "icon": "./assets/notification-icon.png",
        "color": "#337ab7",
        "sounds": ""
      }
    ]],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.iwdtx.todo-list"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/Fallback.png",
        backgroundColor: "#ffffff"
      },
      "package": "com.iwdtx.todo_list"
    },
    web: {
      favicon: "./assets/Fallback.png"
    },
    extra: {
      eas: {
        "projectId": "d8bf8861-7226-4f54-b438-78c4344c2438"
      }
    }
  }
}
