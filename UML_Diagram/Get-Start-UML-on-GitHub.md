# Get Start PlantUML on GitHub

## Local Development Env

> Use `.plantuml` as file extenssion.

### Vscode

Check this [PlantUML - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

### Online Server

Or you can simply use the [online server](https://www.plantuml.com/plantuml/uml/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000).

## PlantUML Syntax

Check below

- [Sequence](https://plantuml.com/sequence-diagram)

- [Use Case](https://plantuml.com/use-case-diagram)

- [Class](https://plantuml.com/class-diagram)

- [Activity](https://plantuml.com/activity-diagram-beta)

## PlantUML on GitHub

Use PlantUML proxy

### Syntax

```md
![You Image Name](http://www.plantuml.com/plantuml/proxy?cache=no&src=[URL_TO_The_PlantUML_File])
```



### The `[URL]` must be the RAW URL

```md
![example-uml](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/jonashackt/plantuml-markdown/master/example-uml.iuml)
```

![example-uml](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/jonashackt/plantuml-markdown/master/example-uml.iuml)



### No Space on the path

When you cannot display the file correctly, try to check your path. Path with space may lead to an incorrect display of the image.
