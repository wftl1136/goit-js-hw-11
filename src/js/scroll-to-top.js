import { refs } from "./refs"; 

export const scrollShow = () => {
    if (window.scrollY > 300) {
        refs.btnScrollUp.classList.add("show");
    } else {
        refs.btnScrollUp.classList.remove("show");
    }
};

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
};