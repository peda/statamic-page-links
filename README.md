# statamic-page-links

## Usage
Edit `site/settings/system.yaml` and add the following to your `redactor` settings

```
plugins:
- definedlinks
- imagelinks
definedLinks: '/cp/addons/page-links/pages/get' 
```

after adding the settings it should like like that

```
redactor:
  - 
    name: Standard
    settings:
      plugins:
        - definedlinks
        - imagelinks
      definedLinks: '/cp/addons/page-links/pages/get'
```