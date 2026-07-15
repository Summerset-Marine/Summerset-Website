import { defineField, defineType } from 'sanity'

export const liftMedia = defineType({
  name: 'liftMedia',
  title: 'Lift Media',
  type: 'document',
  description: 'Photos and marketplace links for lift inventory units. Match the netsuiteItemId to the NetSuite item ID.',
  fields: [
    defineField({
      name: 'netsuiteItemId',
      title: 'NetSuite Item ID',
      type: 'string',
      description: 'Must match the item ID exactly as it appears in NetSuite',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() })]
      }],
      validation: Rule => Rule.min(1)
    }),
    defineField({ name: 'notes', title: 'Notes', type: 'text', rows: 2, description: 'Optional internal notes about this unit' }),
    defineField({
      name: 'marketplaceLinks',
      title: 'Marketplace Listing Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'platform', title: 'Platform', type: 'string', options: { list: ['eBay', 'Boat Trader', 'Facebook Marketplace', 'Other'] } }),
          defineField({ name: 'url', title: 'Listing URL', type: 'url' }),
        ]
      }]
    }),
  ],
  preview: {
    select: { title: 'netsuiteItemId', media: 'photos.0' },
    prepare({ title, media }) {
      return { title: `Unit: ${title}`, media }
    }
  }
})
