import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      options: { list: ['lake-geneva', 'oconomowoc', 'door-county', 'madison', 'whitewater', 'green-lake', 'fox-chain', 'other'] },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'lake',
      title: 'Body of Water',
      type: 'string',
      options: { list: ['geneva-lake', 'okauchee-lake', 'lac-la-belle', 'nagawicka-lake', 'beaver-lake', 'pewaukee-lake', 'moose-lake', 'pine-lake', 'upper-okauchee-lake', 'lake-beulah', 'delavan-lake', 'brown-lake', 'lake-mendota', 'green-bay', 'sturgeon-bay', 'lake-michigan', 'lake-minnetonka', 'other'] },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: { list: ['All Seasons HD Permanent Pier', 'All Seasons Permanent Pier', 'Classic Permanent Pier', 'Minimalist Pier', 'Boat Lift', 'Seasonal Pier', 'Commercial Marine Contracting'] },
      validation: Rule => Rule.required()
    }),
    defineField({ name: 'installYear', title: 'Install Year', type: 'number' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'beforeImage', title: 'Before Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
    defineField({ name: 'afterImage', title: 'After Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() })] }),
    defineField({ name: 'testimonial', title: 'Customer Testimonial', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Project Story', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'sourceUrl', title: 'Migration Source URL', type: 'url', readOnly: true, description: 'Original Squarespace page this project was imported from — used to prevent duplicate imports. Do not edit or remove.' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'lake', media: 'afterImage' },
  }
})
