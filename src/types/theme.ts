export interface ThemeStyles {
    buttonPrimary: string;
    buttonSecondary: string;
    input: string;
    modal: string;
    modalOverlay: string;
    dropdown: string;
    dropdownItem: string;
  }
  
  // Example theme styles
  export const themeStyles: Record<number, ThemeStyles> = {
    1: {
      buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
      buttonSecondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
      input: "border-blue-200 focus:border-blue-500",
      modal: "bg-white shadow-xl rounded-lg",
      modalOverlay: "bg-black bg-opacity-50",
      dropdown: "bg-white shadow-lg rounded-lg",
      dropdownItem: "hover:bg-blue-50 text-gray-700"
    },
    2: {
      buttonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
      buttonSecondary: "bg-purple-100 hover:bg-purple-200 text-purple-800",
      input: "border-purple-200 focus:border-purple-500",
      modal: "bg-white shadow-xl rounded-lg",
      modalOverlay: "bg-purple-900 bg-opacity-50",
      dropdown: "bg-white shadow-lg rounded-lg",
      dropdownItem: "hover:bg-purple-50 text-gray-700"
    },
    3: {
      buttonPrimary: "bg-green-600 hover:bg-green-700 text-white",
      buttonSecondary: "bg-green-100 hover:bg-green-200 text-green-800",
      input: "border-green-200 focus:border-green-500",
      modal: "bg-white shadow-xl rounded-lg",
      modalOverlay: "bg-black bg-opacity-50",
      dropdown: "bg-white shadow-lg rounded-lg",
      dropdownItem: "hover:bg-green-50 text-gray-700"
    },
    4: {
      buttonPrimary: "bg-red-600 hover:bg-red-700 text-white",
      buttonSecondary: "bg-red-100 hover:bg-red-200 text-red-800",
      input: "border-red-200 focus:border-red-500",
      modal: "bg-white shadow-xl rounded-lg",
      modalOverlay: "bg-black bg-opacity-50",
      dropdown: "bg-white shadow-lg rounded-lg",
      dropdownItem: "hover:bg-red-50 text-gray-700"
    },
    5: {
      buttonPrimary: "bg-yellow-600 hover:bg-yellow-700 text-white",
      buttonSecondary: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
      input: "border-yellow-200 focus:border-yellow-500",
      modal: "bg-white shadow-xl rounded-lg",
      modalOverlay: "bg-black bg-opacity-50",
      dropdown: "bg-white shadow-lg rounded-lg",
      dropdownItem: "hover:bg-yellow-50 text-gray-700"
    },
    6: {
      buttonPrimary: "bg-pink-600 hover:bg-pink-700 text-white",
      buttonSecondary: "bg-pink-100 hover:bg-pink-200 text-pink-800",
      input: "border-pink-200 focus:border-pink-500",
      modal: "bg-white shadow-xl rounded-lg",
      modalOverlay: "bg-black bg-opacity-50",
      dropdown: "bg-white shadow-lg rounded-lg",
      dropdownItem: "hover:bg-pink-50 text-gray-700"
    },
    7: {
      buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
      buttonSecondary: "bg-indigo-100 hover:bg-indigo-200 text-indigo-800",
      input: "border-indigo-200 focus:border-indigo-500",
      modal: "bg-white shadow-xl rounded-lg",
      modalOverlay: "bg-black bg-opacity-50",
      dropdown: "bg-white shadow-lg rounded-lg",
      dropdownItem: "hover:bg-indigo-50 text-gray-700"
    },
    8: {
      buttonPrimary: "bg-teal-600 hover:bg-teal-700 text-white",
      buttonSecondary: "bg-teal-100 hover:bg-teal-200 text-teal-800",
      input: "border-teal-200 focus:border-teal-500",
      modal: "bg-white shadow-xl rounded-lg",
      modalOverlay: "bg-black bg-opacity-50",
      dropdown: "bg-white shadow-lg rounded-lg",
      dropdownItem: "hover:bg-teal-50 text-gray-700"
    },
    9: {
      buttonPrimary: "bg-orange-600 hover:bg-orange-700 text-white",
      buttonSecondary: "bg-orange-100 hover:bg-orange-200 text-orange-800",
      input: "border-orange-200 focus:border-orange-500",
      modal: "bg-white shadow-xl rounded-lg",
      modalOverlay: "bg-black bg-opacity-50",
      dropdown: "bg-white shadow-lg rounded-lg",
      dropdownItem: "hover:bg-orange-50 text-gray-700"
    }
  };