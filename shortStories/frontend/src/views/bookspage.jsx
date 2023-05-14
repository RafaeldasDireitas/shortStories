import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Navbar from "../components/Navbar";
import CardFromBooks from "../components/CardFromBooks";

export default function BooksPage() {
    return (
        <>
        <Navbar/>
        <CardFromBooks></CardFromBooks>
        
        </>
    )
}