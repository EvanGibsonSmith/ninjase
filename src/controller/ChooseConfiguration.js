import { Model } from '../model/Model.js'
import { Puzzle } from '../model/Puzzle.js'

export function chooseConfiguration(configuration) { // TODO what is the entry condition? Can we be in the middle of another puzzle?
    //TODO (probably nearing the end). Need boundary dropdown?
    return new Model(new Puzzle(configuration)) // TODO DRY?
} 