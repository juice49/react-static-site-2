## Collections

Tag list.
Tag pages.
Archive page (all tags).

## Pagination

## Default page

Collection or page.

## How to make it work?

A `<Query>` component.

- /:page
- /tags/:page
  - /tags/:tag/:page
- /:slug

## Example data

/data/posts/1.json
/data/posts/2.json
/data/posts/foo/1.json
```
{
  "pageLength": 10,
  "total": 31,
  "items": [
    {
      "title": "Foo",
      "urn": "foo",
      "date": "2017-03-12T23:46:07.568Z",
      "tags": [ "foo", "bar" ]
    }
  ]
}
```

/data/tags/1.json
```
{
  "pageLength": 10,
  "total": 31,
  "items": [
    {
      "title": "Foo tag",
      "urn": "foo-tag"
    }
  ]
}
```

/queries/oiej3.json
When Kalopsia encounters a <Query> component, an id will be assigned and a JSON
file will be created containing the matching data.