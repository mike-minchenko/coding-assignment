import { useState } from "react"

import ModalOverlay from "../../../ModalOverlay/ModalOverlay"
import type { IMovie } from "../../../../models/movie"
import MovieBodyComponent from "./MovieBodyComponent"
import "./Movie.scss"

const Movie = ({ movie }: MovieProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isInModalClass = isModalOpen ? "in-modal" : ""

  const onModalClick = () => {
    const isMobile = window.innerWidth <= 720
    if (!isMobile) return

    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <MovieBodyComponent movie={movie} onClick={onModalClick} />

      <ModalOverlay
        isOpened={isModalOpen}
        onClose={onCloseModal}
        overlayClassName="movie__preview-overlay"
      >
        <MovieBodyComponent
          movie={movie}
          className={isInModalClass}
          onClose={onCloseModal}
        />
      </ModalOverlay>
    </>
  )
}

export default Movie

interface MovieProps {
  movie: IMovie
}
