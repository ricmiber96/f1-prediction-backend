const Race = require('../models/race.model')

const getRaces = async (req, res) => {
  try {
    const races = await Race.find()
      .sort({ date: -1 }) // Sort by date field in descending order to get the last race
      .exec()
    res.status(200).json(races)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getRacesWithResults = async (req, res) => {
  try {
    const races = await Race.findOne({ raceResult: { $ne: undefined } })
      .sort({ date: -1 }) // Sort by date field in descending order to get the last race
      .exec()
    res.status(200).json(races)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getRaceById = async (req, res) => {
  const { id } = req.params
  try {
    const race = await Race.findById(id)
    if (race) {
      res.status(200).json(race)
    } else {
      res.status(404).json({ message: 'race not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateRaceResults = async (req, res) => {
  const { id } = req.params
  const { raceResult } = req.body
  try {
    const race = await Race.findById(id)
    if (!race) {
      return res.status(404).json({ message: 'race not found' })
    } else {
      const updateRace = await Race.findByIdAndUpdate(id, { raceResult }, { new: true })
      res.status(200).json(updateRace)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getRaces,
  getRaceById,
  updateRaceResults
}
