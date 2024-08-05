export default{
  expo: {
    name: "Todo List",
    slug: "todo_list",
    version: "1.0.0",
    icon: "./assets/Fallback.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/Fallback.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
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
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        "projectId": "d8bf8861-7226-4f54-b438-78c4344c2438"
      }
    }
  }
}
