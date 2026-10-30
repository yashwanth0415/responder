# +responder website (static)

Pages: index.html (Home) · about.html · home-service.html · register.html · blogs.html (+ blog.html article view) · contact.html

## Header & footer are separate
Edit `includes/header.html` and `includes/footer.html` once, then run `python3 build.py` – it bakes them into every page (page bodies live in `src/`).
The scrolling news ticker items are the NEWS list at the top of `build.py`.

## Notes
- Homepage design is unchanged; only the hero form, ticker, nav, footer and links were updated.
- Forms (hero, Contact, Register, Home Service) validate in the browser and show a confirmation. Connect them to your backend/email where `forms.js` / `home.js` say TODO.
- Blog posts are in `assets/js/blogs-data.js` – add/edit objects there.
- Footer "Legal" links are placeholders (#) until you add those pages.
