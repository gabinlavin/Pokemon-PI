// import React from "react";
// import style from "./paginado.module.css";
// // import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setInput, setPagina } from "../../Redux/actions/actions";

// const Paginado = ({ maximo }) => {
//   const pagina = useSelector(state => state.pages)
//   const input = useSelector(state => state.input)

//   // const [input, setInput] = useState(1);
  
//   const dispatch = useDispatch()
//   const nextPage = () => {
//     dispatch(setInput(parseInt(input) + 1));
//     dispatch(setPagina(parseInt(pagina) + 1));
//   };

//   const prevPage = () => {
//     dispatch(setInput(parseInt(input) - 1));
//     dispatch(setPagina(parseInt(pagina) - 1));
//   };

//   const handlerOnKeyDown = (e) => {
//     if (e.keyCode === 13) {
//       dispatch(setPagina(parseInt(e.target.value)));
//       if (
//         parseInt(e.target.value) < 1 ||
//         parseInt(e.target.value) > Math.ceil(maximo) ||
//         isNaN(parseInt(e.target.value))
//       ) {
//         dispatch(setPagina(1));
//         dispatch(setInput(1));
//       } else {
//         dispatch(setPagina(parseInt(e.target.value)));
//       }
//     }
//   };
//   const handlerOnChange = ({ target }) => {
//     dispatch(setInput(target.value));
//   };
//   return (
//     <div className={style.container}>
//       <button
//         disabled={pagina === 1 || pagina < 1}
//         onClick={prevPage}
//         className={style.btn}
//       >
//       Prev
//       </button>

//       <input
//         type="text"
//         value={input}
//         autoComplete="off"
//         onKeyDown={(e) => handlerOnKeyDown(e)}
//         onChange={(e) => handlerOnChange(e)}
//         maxLength="1"
//         className={style.inp}
//       />
//       <p className={style.p}>de {Math.ceil(maximo)}</p>
//       <button
//         disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
//         onClick={nextPage}
//         className={style.btn}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Paginado;