import { Link } from 'react-router'
import { useGetPokemonQuery } from '../api/pokemonApi'
import { artworkUrl, formatName } from '../utils/pokemon'

/** Chip enlazado a la ficha de un Pokémon (usado para etiquetar publicaciones). */
export function PokemonTag({ name }: { name: string }) {
  const { data } = useGetPokemonQuery(name)

  return (
    <Link
      to={`/pokemon/${name}`}
      className="hover:border-brand-500 hover:text-brand-700 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white py-0.5 pr-3 pl-1 text-xs font-semibold text-slate-700 transition"
    >
      {data ? (
        <img src={artworkUrl(data.id)} alt="" className="size-6 object-contain" />
      ) : (
        <span className="size-6 rounded-full bg-slate-100" />
      )}
      {formatName(name)}
    </Link>
  )
}
