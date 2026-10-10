'use client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <Select.Root>
        <Select.Trigger />
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value='1'>Sydney Christopher Jnr</Select.Item>
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
