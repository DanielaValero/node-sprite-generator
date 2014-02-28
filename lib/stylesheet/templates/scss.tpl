<% layout.images.forEach(function (image) { %>$<%= image.className %><%= options.sufix %>: <%= getCSSValue(-image.x) %> <%= getCSSValue(-image.y) %> <%= getCSSValue(image.width) %> <%= getCSSValue(image.height) %>;
<% }); %>

@mixin <%= spriteName %><%= options.sufix %>($sprite) {
<% if (options.includeUrl === true) { %>background-image: url("<%= options.spritePath %>");<% } %>
  <% if (options.pixelRatio !== 1) { %>background-size: (<%= getCSSValue(layout.width) %> / 2) (<%= getCSSValue(layout.height) %> / 2);
  background-position: (nth($sprite, 1)/2) (nth($sprite, 2) / 2);
  width: nth($sprite, 3) / 2;
  height: nth($sprite, 4) / 2;<% } %>
  <% if (options.pixelRatio === 1) { %>background-position: nth($sprite, 1) nth($sprite, 2);
  width: nth($sprite, 3);
  height: nth($sprite, 4);<% } %>
}