import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import Navbar from "../../components/navBar";
import supabase from "../../utils/supabase";

export default function editOrder() {
    const progress = {0: "pending", 1: "in progress", 2: "in oven", 3: "done"};
}