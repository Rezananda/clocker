const useLetterAvatar = (firstName, lastName) => {
    if(lastName === undefined){
        return firstName.split(" ").shift().charAt(0)
    }else{
        return firstName.split(" ").shift().charAt(0) + lastName.split(" ").pop().charAt(0)

    }
}

export default useLetterAvatar