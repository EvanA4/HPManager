# HPManager

The HomePages (HP) Manager is a Tauri-based desktop application for reading and writing experiences and blogs for the HomePages website.

### ROUTES:

- `/`
    - big ol greeting
    - ooh ahh fancy

- `/blogs`
    - just like the same route on the official website
        - clicking on a blog snippet will take you to the editing page, though!
    - only exception: an ADD BLOG button that will take you to `/blogs/new`

- `/blogs/[title]`
    - will give you the editing page for an blog

- `/exp`, `/proj`
    - view elements
    - click on element to edit it
    - option to create entirely new element
    - while editing/creating element, see it at the side