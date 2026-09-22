/**
 * Integración JSONPlaceholder ⇄ PokeAPI: cada usuario tiene un Pokémon compañero.
 * La relación es determinista (mismo usuario → mismo Pokémon) para que sea estable.
 */
const PARTNER_POKEMON_IDS = [25, 6, 9, 3, 94, 149, 448, 133, 143, 150]

export function partnerPokemonId(userId: number): number {
  const index =
    (((userId - 1) % PARTNER_POKEMON_IDS.length) + PARTNER_POKEMON_IDS.length) %
    PARTNER_POKEMON_IDS.length
  return PARTNER_POKEMON_IDS[index]!
}
