import { artworkUrl } from '@/features/pokemon/utils/pokemon'
import { cn } from '@/shared/utils/cn'
import { useUser } from '../api/usersApi'
import { partnerPokemonId } from '../utils/partner'

type Props = { userId: number; showName?: boolean; className?: string }

/** Avatar del autor: su Pokémon compañero + nombre. */
export function AuthorAvatar({ userId, showName = true, className }: Props) {
  const { user } = useUser(userId)

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <img
        src={artworkUrl(partnerPokemonId(userId))}
        alt=""
        loading="lazy"
        className="size-8 rounded-full bg-slate-100 object-contain p-0.5 ring-1 ring-slate-200"
      />
      {showName && (
        <span className="text-sm font-medium text-slate-700">
          {user?.name ?? `Usuario ${userId}`}
        </span>
      )}
    </span>
  )
}
