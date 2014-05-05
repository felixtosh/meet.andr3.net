---
layout: post
title: "Markup and Templates: Rails"
date: {2014-04-30}
categories: markup_and_templates
published: true
---

## Doctype 

All web pages must use the HTML5 doctype.

<div class="example-code" data-code>
{% highlight html %}
<!doctype html>
{% endhighlight %}
</div>

## Code Style

All elements which don't need a closing tag must be closed in HTML form.

<div class="example-code" data-code>
{% highlight html %}
<img src="foo.jpg" alt=""> <!-- correct -->
<img src="foo.jpg" alt="" /> <!-- incorrect -->
{% endhighlight %}
</div>

## Base template



## Application icons & favicon


You'll find this post in your `_posts` directory - edit this post and re-build (or run with the `-w` switch) to see your changes!
To add new posts, simply add a file in the `_posts` directory that follows the convention: YYYY-MM-DD-name-of-post.ext.

Jekyll also offers powerful support for code snippets:

{% capture codesnippet1 %}
<h2>Example</h2>
<p>This should be printed and then escaped + highlighted.</p>
{% endcapture %}

<div class="example">
{{ codesnippet1 }} 
</div>

![](/img/Screenshot%202014-04-30%2015.26.30.png)

<div class="example-code">
{% highlight html %}
{{ codesnippet1}}
{% endhighlight %}
</div>