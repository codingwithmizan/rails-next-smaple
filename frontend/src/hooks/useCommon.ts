// import { useState } from "react";

// export const useCommon = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [ready, setReady] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const toggleModalVisible = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   return {
//     isModalVisible,
//     loading,
//     setLoading,
//     toggleModalVisible,
//     ready,
//     setReady,
//     submitting,
//     setSubmitting,
//   };
// };

import { useState, useCallback } from "react";

export const useCommon = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleModalVisible = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, []);

  return {
    isModalVisible,
    setIsModalVisible,
    loading,
    setLoading,
    ready,
    setReady,
    submitting,
    setSubmitting,
    toggleModalVisible,
  };
};
