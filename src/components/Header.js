import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingVertical: 12,
    marginBottom: 30,
  },
})
