tsc --module commonjs ./model.ts -d
mv model.d.ts type_definitions/model.d.ts
perl -pi -e 's/type_definitions\///g' type_definitions/model.d.ts

# Build regular Typescript files
tsc --moduleResolution node --m commonjs --target ES5 --removeComments model.ts
tsc --moduleResolution node --m commonjs --target ES5 --removeComments ui.ts
tsc --moduleResolution node --m commonjs --target ES5 --removeComments model_server.ts

# Build JSX files
tsc --moduleResolution node --m commonjs --target ES5 --jsx react app/error_label.tsx app/user_settings.tsx app/number_input.tsx app/email_input.tsx

browserify model.js ui.js index.js app/user_settings.js app/error_label.js app/number_input.js app/email_input.js -o index.min.js
browserify model.js ui.js workout_view.js -o workout_view.min.js

tsc --module commonjs ./tests.ts
node tests.js