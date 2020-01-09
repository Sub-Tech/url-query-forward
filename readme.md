# url-query-forward
This is a simple mini lib / minified gist for injecting the pages query string into links on the page.  This is intended for CMS' and lander builder sites like Instapage where tracking query params can be forwarded on.

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


## Dev
We use babel to transpile the es6 code and minify.  Run `yarn start` for dev and `yarn build` for production.  Identical build process only one has a watcher.
Simply wrap the script in `<script>` tags and pass it to whoever wants it.
