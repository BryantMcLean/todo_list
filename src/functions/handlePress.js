export const handlePress = (description, setPopupDescription, setPopupVisible) => {
        if (description === "" || description === undefined) {
            return;
        } 
        setPopupDescription(description);
        setPopupVisible(true);
}