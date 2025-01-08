import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const getPaperTheme = (colorScheme) => {
  return colorScheme === "dark"
    ? {
        ...MD3DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          primary: "rgb(3, 177, 252)",
          onPrimary: "rgb(0, 52, 78)",
          primaryContainer: "rgb(0, 75, 111)",
          onPrimaryContainer: "rgb(201, 230, 255)",
          secondary: "rgb(183, 201, 217)",
          onSecondary: "rgb(34, 50, 63)",
          secondaryContainer: "rgb(56, 73, 86)",
          onSecondaryContainer: "rgb(211, 229, 245)",
          tertiary: "rgb(206, 192, 232)",
          onTertiary: "rgb(53, 43, 75)",
          tertiaryContainer: "rgb(76, 65, 99)",
          onTertiaryContainer: "rgb(234, 221, 255)",
          error: "rgb(255, 180, 171)",
          onError: "rgb(105, 0, 5)",
          errorContainer: "rgb(147, 0, 10)",
          onErrorContainer: "rgb(255, 180, 171)",
          background: "rgb(26, 28, 30)",
          onBackground: "rgb(226, 226, 229)",
          surface: "rgb(26, 28, 30)",
          onSurface: "rgb(226, 226, 229)",
          surfaceVariant: "rgb(65, 71, 77)",
          onSurfaceVariant: "rgb(193, 199, 206)",
          outline: "rgb(139, 145, 152)",
          outlineVariant: "rgb(65, 71, 77)",
          shadow: "rgb(0, 0, 0)",
          scrim: "rgb(0, 0, 0)",
          inverseSurface: "rgb(226, 226, 229)",
          inverseOnSurface: "rgb(46, 49, 51)",
          inversePrimary: "rgb(0, 100, 145)",
          elevation: {
            level0: "transparent",
            level1: "rgb(32, 37, 41)",
            level2: "rgb(35, 42, 48)",
            level3: "rgb(38, 48, 55)",
            level4: "rgb(39, 49, 57)",
            level5: "rgb(42, 53, 62)",
          },
          surfaceDisabled: "rgba(226, 226, 229, 0.12)",
          onSurfaceDisabled: "rgba(226, 226, 229, 0.38)",
          backdrop: "rgba(43, 49, 55, 0.4)",
        },
      }
    : {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: "rgb(3, 177, 252)",
          onPrimary: "rgb(255, 255, 255)",
          primaryContainer: "rgb(201, 230, 255)",
          onPrimaryContainer: "rgb(0, 30, 47)",
          secondary: "rgb(80, 96, 110)",
          onSecondary: "rgb(255, 255, 255)",
          secondaryContainer: "rgb(211, 229, 245)",
          onSecondaryContainer: "rgb(12, 29, 41)",
          tertiary: "rgb(100, 89, 123)",
          onTertiary: "rgb(255, 255, 255)",
          tertiaryContainer: "rgb(234, 221, 255)",
          onTertiaryContainer: "rgb(32, 22, 53)",
          error: "rgb(186, 26, 26)",
          onError: "rgb(255, 255, 255)",
          errorContainer: "rgb(255, 218, 214)",
          onErrorContainer: "rgb(65, 0, 2)",
          background: "rgb(252, 252, 255)",
          onBackground: "rgb(26, 28, 30)",
          surface: "rgb(252, 252, 255)",
          onSurface: "rgb(26, 28, 30)",
          surfaceVariant: "rgb(221, 227, 234)",
          onSurfaceVariant: "rgb(65, 71, 77)",
          outline: "rgb(113, 120, 126)",
          outlineVariant: "rgb(193, 199, 206)",
          shadow: "rgb(0, 0, 0)",
          scrim: "rgb(0, 0, 0)",
          inverseSurface: "rgb(46, 49, 51)",
          inverseOnSurface: "rgb(240, 240, 243)",
          inversePrimary: "rgb(138, 206, 255)",
          elevation: {
            level0: "transparent",
            level1: "rgb(239, 244, 250)",
            level2: "rgb(232, 240, 246)",
            level3: "rgb(224, 235, 243)",
            level4: "rgb(222, 234, 242)",
            level5: "rgb(217, 231, 240)",
          },
          surfaceDisabled: "rgba(26, 28, 30, 0.12)",
          onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
          backdrop: "rgba(43, 49, 55, 0.4)",
        },
      };
};
