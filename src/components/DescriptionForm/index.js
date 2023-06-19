import React from "react";

import "./styles.css";

export default function DescriptionForm({ description }) {
    return (
        <p className="form__description">
            {description}
        </p>
    )
};