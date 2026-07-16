import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: Rule => Rule.required() }),
    defineField({ name: 'customerName', title: 'Customer Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'lakeLabel', title: 'Lake Label', type: 'string', description: 'e.g. Geneva Lake homeowner', validation: Rule => Rule.required() }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      options: { list: ['lake-geneva', 'oconomowoc', 'door-county', 'madison', 'whitewater', 'green-lake', 'fox-chain'] },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: { list: ['permanent-piers', 'lifts', 'seasonal-systems', 'marine-contracting', 'general'] }
    }),
    defineField({ name: 'starRating', title: 'Star Rating', type: 'number', options: { list: [1, 2, 3, 4, 5] } }),
  ],
  preview: {
    select: { title: 'customerName', subtitle: 'lakeLabel' },
  }
})
