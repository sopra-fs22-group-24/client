# SoPra Project Group 22 Uno Extreme Client

## Introduction
We are a Team of 4 Students at the UZH of Zürich.
For the course Software Enginnering Lab we had to build a web app.
We wanted to make a fun project and therefore we decided to implement a game.
The game we choose is the popular game Uno Extreeme.

## Technologies
- React
- Microsoft Azure Text to Speech

## High Level Components
- dashboard
- ranking
- profilpage
- game
- lobby

## Launch and Deployement
Download your IDE of choice: (e.g., [Eclipse](http://www.eclipse.org/downloads/), [IntelliJ](https://www.jetbrains.com/idea/download/)), [Visual Studio Code](https://code.visualstudio.com/) and make sure Java 15 is installed on your system (for Windows-users, please make sure your JAVA_HOME environment variable is set to the correct version of Java).

1. File -> Open... -> SoPra Server Template
2. Accept to import the project as a `gradle project`

To build right click the `build.gradle` file and choose `Run Build`

You can use the local Gradle Wrapper to build the application.
-   macOS: `./gradlew` (on M1 machines npm install has to be run using rosetta)

-   Linux: `./gradlew`
-   Windows: `./gradlew.bat`

More Information about [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html) and [Gradle](https://gradle.org/docs/).

### Build

```bash
./gradlew build
```

### Run

```bash
./gradlew bootRun
```

### Test

```bash
./gradlew test
```

### Development Mode

You can start the backend in development mode, this will automatically trigger a new build and reload the application
once the content of a file has been changed and you save the file.

Start two terminal windows and run:

`./gradlew build --continuous`

and in the other one:

`./gradlew bootRun`

If you want to avoid running all tests with every change, use the following command instead:

`./gradlew build --continuous -xtest`

### developers who want to contribute?? explain


## Roadmap

### Feature 1
### Feature 2
### Feature 3



## Authors and acknowledgment
### Authors
- Livia Stöckli
- Florian Rüegsegger
- Lea Kehrli
- Mauro Hirt

### Acknowledgment
- Kyrill Hux: Project Assistant teacher
- Thomas Fritz: Professor
- Roy Rutishauser: Head asssistant teacher
## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

