export const handlePress = (description, setPopupDescription, setPopupVisible) => {
        if (description === "" || description === undefined) {
            alert("No description given.")
            return;
        } 
        setPopupDescription(description);
        setPopupVisible(true);
}