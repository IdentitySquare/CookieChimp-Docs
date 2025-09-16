# Webflow Installation Guide Images

This directory should contain screenshots for the Webflow installation guide. 

## Required Images:

1. **webflow-project-settings.png**
   - Screenshot of Webflow dashboard showing Project Settings navigation
   - Should highlight the path: Project Settings > Custom Code

2. **webflow-custom-code-head.png**
   - Screenshot of the Custom Code section in Webflow
   - Should show the Head Code textarea where the CookieChimp script should be added
   - Highlight the Head Code section specifically

3. **webflow-element-id-setting.png**
   - Screenshot of Webflow Designer showing how to set an element's ID
   - Should demonstrate setting ID to "cookiechimp-container"
   - Show the Element Settings panel

4. **webflow-custom-attribute.png**
   - Screenshot showing how to add custom attributes to elements
   - Should demonstrate adding data-cc="show-preferencesModal" attribute
   - Show the Element Settings panel with custom attributes section

5. **webflow-publish-button.png**
   - Screenshot of the Webflow Designer showing the Publish button
   - Should highlight the publish workflow

## Image Guidelines:

- Use PNG format for clear screenshots
- Ensure high resolution (at least 1200px wide)
- Add red arrows or highlighting to point to relevant UI elements
- Keep screenshots up-to-date with current Webflow UI
- Include alt text descriptions when adding to the MDX file

## Adding Images to the Guide:

Once screenshots are available, update the webflow.mdx file to include them:

```mdx
<img src="/images/webflow/webflow-project-settings.png" alt="Webflow Project Settings navigation" />
```