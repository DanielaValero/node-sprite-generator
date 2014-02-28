<% layout.images.forEach(function (image) { %><% if (!image.ignore) { %>$<%= image.className %><%= options.sufix %>: <%= getCSSValue(-image.x) %> <%= getCSSValue(-image.y) %> <%= getCSSValue(image.width) %> <%= getCSSValue(image.height) %>;
<% } }); %>

@mixin <%= spriteName %><%= options.sufix %>($sprite) {
  <% if (options.includeUrl === true) { %>background-image: url("<%= options.spritePath %>");<% } %>
  <% if (options.pixelRatio !== 1) { %>background-size: <%= getCSSValue(layout.width) %> <%= getCSSValue(layout.height) %>;<% } %>
  background-position: nth($sprite, 1) nth($sprite, 2);
  width: nth($sprite, 3);
  height: nth($sprite, 4);
}
