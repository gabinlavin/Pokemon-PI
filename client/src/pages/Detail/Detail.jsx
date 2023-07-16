import { useParams } from "react-router-dom";
import { getPokemon } from "../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./detail.module.css";
const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemon(id));
  }, [id, dispatch]);
  const pokemonId = useSelector((state) => state.pokemon);
  console.log(pokemonId);

  return (
    <section className={style.pokemon}>
      {!pokemonId.types ? (
        <div className={style.loading}>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <article className={style.container_img_tittle}>
            <div className={style.back_img}>
              <figure className={style.container_img}>
                <img
                  src={pokemonId.image}
                  alt={pokemonId.name}
                  className={style.img}
                />
              </figure>
            </div>
            <h2 className={style.tittle}>{pokemonId.name}</h2>
          </article>
          <article className={style.container_types}>
            {pokemonId.types?.map((t, i) => (
              <span key={i} className={style.type}>
                {" "}
                {t}{" "}
              </span>
            ))}
          </article>
          <article className={style.container_w_h}>
            <div className={style.weight}>
              <p>{pokemonId.weight} Kg</p>
              <span>weight</span>
            </div>
            <div className={style.height}>
              <p>{pokemonId.height} M</p>
              <span>height</span>
            </div>
          </article>
          <article className={style.base_stats}>
            <h3>base Stats</h3>
            <main className={style.main_base_stats}>
              <div className={style.stats}>
                <label htmlFor="hp">HP </label>
                <progress id="hp" max="200" value={pokemonId.hp}></progress>
                <span>{pokemonId.hp}/200</span>
              </div>
              <div className={style.stats}>
                <label htmlFor="attack">ATTACK </label>
                <progress
                  id="attack"
                  max="200"
                  value={pokemonId.attack}
                ></progress>
                <span>{pokemonId.attack}/200</span>
              </div>

              <div className={style.stats}>
                <label htmlFor="defense">DEFENSE </label>
                <progress
                  id="defense"
                  max="200"
                  value={pokemonId.defense}
                ></progress>
                <span>{pokemonId.defense}/200</span>
              </div>

              <div className={style.stats}>
                <label htmlFor="speed">SPEED </label>
                <progress
                  id="speed"
                  max="200"
                  value={pokemonId.speed}
                ></progress>
                <span>{pokemonId.speed}/200</span>
              </div>
            </main>
          </article>
        </div>
      )}
    </section>
  );
};

export default Detail;
