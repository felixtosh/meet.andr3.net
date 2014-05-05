<nav class="navigation" role="navigation">
{% capture toc %}
<!--
  Table of Contents. 
  Edit online between START and END 
-->

<!-- START -->

1. [Identity](/styleguide%20identity%20brand/2014/05/02/identity.html)
1. Markup
  1. [Markup and Templates: Setup](/markup_and_templates/2014/04/30/welcome-to-jekyll.html)
  1. [Markup and Templates: Rails](/markup_and_templates/2014/04/30/markup-rails.html)
  1. Components
    1. [Buttons](/styleguide/2014/05/02/buttons.html)

<!-- END -->
{% endcapture %}
{{ toc | markdownify }}

<div class="all-pages-dump">
  <details>
    <summary>All pages</summary>
    <ul>
      {% for post in site.posts reversed | sort: title %}
      <li>
        <a href="{{site.link_prefix}}{{post.url}}">
          {{post.title | replace:'"','\"'}}
        </a>
      </li>
      {% endfor %}
    </ul>

  </details>
</div>

</nav><!-- /nav -->
