import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required().max(60) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      options: { list: ['lake-geneva', 'oconomowoc', 'door-county', 'madison', 'whitewater', 'green-lake', 'fox-chain', 'general'] }
    }),
    defineField({
      name: 'lake',
      title: 'Body of Water',
      type: 'string',
      options: { list: ['geneva-lake', 'okauchee-lake', 'lac-la-belle', 'nagawicka-lake', 'beaver-lake', 'pewaukee-lake', 'moose-lake', 'pine-lake', 'upper-okauchee-lake', 'lake-beulah', 'delavan-lake', 'brown-lake', 'lake-mendota', 'green-bay', 'sturgeon-bay', 'lake-michigan', 'general'] }
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: { list: ['permanent-piers', 'lifts', 'seasonal-systems', 'marine-contracting', 'general'] }
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() })]
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: Rule => Rule.max(155) }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'metaTitle', title: 'SEO Title', type: 'string', validation: Rule => Rule.max(60) }),
    defineField({ name: 'metaDescription', title: 'SEO Description', type: 'text', rows: 2, validation: Rule => Rule.max(155) }),
  ],
  preview: {
    select: { title: 'title', market: 'market', media: 'featuredImage' },
    prepare({ title, market, media }) {
      return { title, subtitle: market || 'No market assigned', media }
    }
  }
})
