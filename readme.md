# url-query-forward
This is a simple mini lib / minified gist for injecting the pages query string into links on the page.  This is intended for CMSs and lander builder sites like Instapage where tracking query params can be forwarded on.

## usage
any link that requires query forwarding should be edited to include this keyword after the URL
`#QFORWARD` this includes the hash.  We use a hash as it should'nt fek out a URL if things go pear shaped.
Any links that do not have `#QFORWARD` will remain unaffected.

example:

`<a href="https://google.com#QFORWARD" target="_blank">Click here</a>`

You can also include hardcoded query params as well
`https://google.com?foo=bar#QFORWARD` or `https://google.com#QFORWARD?foo=baz` are all good.  These links will inject the pages query string but keep the `foo` param as well.

The script can be included anywhere on the page - in the head or anywhere in the body is fine.

To use simply add add script tags and paste in the contents of `/dist/url-query-forward.min.js`
```
<script>
[paste in content from /dist/url-query-forward.min.js]
</script>
```

If you are unfamiliar with github go [HERE](https://raw.githubusercontent.com/Sub-Tech/url-query-forward/master/dist/url-query-forward.min.js) to get the code to paste between the `script` tags.

## Advance usage
You can specify which query params you would like to use by adding a global var `_urlqueryforward_only_forward`
example
`<script>
var _urlqueryforward_only_forward = [
{
find_param: 'OutbrainClickId',
map_to: 's1'
},
{
find_param: 'ad_title',
map_to: 's2'
}
]
</script>`

this must be declared before the main code block eg

```
<script>
var _urlqueryforward_only_forward = [
{
 find_param: 'OutbrainClickId',
 map_to: 's1'
},
{
 find_param: 'ad_title',
 map_to: 's2'
}
]
</script>
<script>
[paste in content from /dist/url-query-forward.min.js]
</script>
```


Inside the array you have objects mapping the `find_param` which exists in the url to `map_to` which will be the used key in the page links
Doing so will mean that only those params will be copied from the url query string into the links.

If this param is empty or not declared, all params from the query string will be used

## Dev
We use babel to transpile the es6 code and minify.  Run `yarn start` for dev and `yarn build` for production.  Identical build process only one has a watcher.
Simply wrap the script in `<script>` tags and pass it to whoever wants it.
