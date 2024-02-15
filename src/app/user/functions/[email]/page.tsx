"use client"

import EditeForm from "./editForm"

export default function userEdit({ params }: { params: { email: string } }) {
    const email = params.email

        return (
            <div className="container mx-auto my-8">
                <EditeForm params={{email}}/>
            </div>
        )
    }