import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'title', title: 'Job Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 5 }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() })]
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: 'Lower numbers appear first' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  }
})
