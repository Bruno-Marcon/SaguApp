import { useState } from "react"
import { View, Text, TouchableOpacity, FlatList, Modal, Pressable } from "react-native"
import { Feather } from "@expo/vector-icons"

type DropdownFilterProps = {
  label: string
  value: string
  options: string[]
  onChange: (newValue: string) => void
}

export default function DropdownFilter({ label, value, options, onChange }: DropdownFilterProps) {
  const [open, setOpen] = useState(false)

  return (
    <View className="mr-2">
      <Text className="text-xs text-gray-500 mb-1">{label}</Text>

      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="border border-gray-300 rounded-md px-3 py-2 flex-row items-center justify-between bg-white"
      >
        <Text>{value}</Text>
        <Feather name="chevron-down" size={16} color="#6b7280" />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setOpen(false)}
        >
          <View style={{ width: 200, backgroundColor: "white", borderRadius: 8, padding: 10 }}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className="py-2"
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
