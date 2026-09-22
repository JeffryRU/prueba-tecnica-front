import { Link } from 'react-router'
import { useGetPokemonQuery } from '@/features/pokemon/api/pokemonApi'
import { TypeBadge } from '@/features/pokemon/components/TypeBadge'
import { artworkUrl, formatName } from '@/features/pokemon/utils/pokemon'
import { Card } from '@/shared/components/ui/Card'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { useUser } from '../api/usersApi'
import { partnerPokemonId } from '../utils/partner'

/** Datos del autor (JSONPlaceholder) combinados con su Pokémon compañero (PokeAPI). */
export function AuthorCard({ userId }: { userId: number }) {
  const { user, isLoading } = useUser(userId)
  const partnerId = partnerPokemonId(userId)
  const { data: partner } = useGetPokemonQuery(partnerId)

  return (
    <Card title="Autor">
      {isLoading ? (
        <Skeleton className="h-24" />
      ) : (
        <div className="space-y-4">
          <div>
            <p className="font-semibold">{user?.name ?? `Usuario ${userId}`}</p>
            {user && (
              <p className="text-sm text-slate-500">
                @{user.username} · {user.email}
              </p>
            )}
          </div>
          <Link
            to={`/pokemon/${partner?.name ?? partnerId}`}
            className="hover:bg-brand-50 flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition"
          >
            <img src={artworkUrl(partnerId)} alt="" className="size-14 object-contain" />
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Pokémon compañero</p>
              <p className="font-semibold">{partner ? formatName(partner.name) : '…'}</p>
              <div className="flex gap-1">
                {partner?.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
            </div>
          </Link>
        </div>
      )}
    </Card>
  )
}
