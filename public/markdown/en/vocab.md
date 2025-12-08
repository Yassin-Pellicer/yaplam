A comprehensive desktop application for learning languages built with Electron, React, and TypeScript. VocaB provides an intuitive interface for managing vocabulary, tracking progress, and practicing language skills through interactive exercises.

## Project Overview

VocaB is designed to make vocabulary acquisition systematic and engaging. The application features a multiple language system. Each word entry includes detailed grammatical information, usage examples, and contextual explanations to facilitate deeper understanding.

The interface showcases a "Words of the Moment" dashboard that displays daily vocabulary recommendations, recent additions to your personal dictionary, and comprehensive statistics tracking your learning progress. With 68 words currently stored across both dictionaries, the application provides a solid foundation for building language proficiency.

## Project Structure

The application follows a modern TypeScript-based architecture, leveraging Vite for fast development and hot module replacement. The Electron framework enables cross-platform desktop deployment, ensuring the application runs seamlessly on Windows, macOS, and Linux.

## Core Features

### Multi-Language Dictionary System

The application provides dedicated dictionaries for both German and French, each containing carefully curated vocabulary entries. Currently, the German dictionary holds 49 words while the French dictionary contains 19 words, forming a growing repository of essential vocabulary.

Each dictionary entry is enriched with comprehensive linguistic information:

- **Part of Speech**: Clear classification (verb, noun, adjective, etc.)
- **Grammatical Gender**: Masculine/feminine markings for nouns
- **Number Indicators**: Singular/plural information
- **Spanish Translations**: Direct equivalents in Spanish
- **Detailed Definitions**: Contextual explanations in Spanish
- **Usage Examples**: Real-world sentence examples with translations
- **Grammar Notes**: Conjugation patterns, declensions, and special cases

### Word of the Day Feature

The application highlights featured vocabulary through the "Word of the Day" system, currently showcasing:

**German**: *Stuhl* (Chair/Silla)
- **Type**: noun, masculine, singular
- **Definition**: "Asiento individual con respaldo, generalmente con cuatro patas"
- **Date Added**: December 7, 2025

**French**: *Architecte* (Architect/Arquitecto)  
- **Type**: noun, masculine, singular
- **Definition**: "Profesional que diseña edificios y dirige su construcción"
- **Date Added**: December 7, 2025

This rotation system encourages daily engagement with new vocabulary, making learning a consistent habit.

### Recent Vocabulary Tracking

The interface displays recently added words for quick reference and review:

**German Recent Additions**:
- **Essen** (Comer/To eat) - verb: "Ingerir alimentos"
- **Trinken** (Beber/To drink) - verb: "Ingerir líquidos"
- **Spielen** (Jugar/To play) - verb: "Realizar una actividad recreativa o de entretenimiento"

**French Recent Additions**:
- **Professeur** (Profesor, Maestro/Teacher) - noun: "Persona que se dedica profesionalmente a la enseñanza"
- **Médecin** (Médico, Doctor/Doctor) - noun: "Profesional de la medicina que diagnostica y trata enfermedades"

### Frontend Architecture

The application leverages modern React patterns and TypeScript for type safety:

**React 18**: Utilizes the latest React features including concurrent rendering, automatic batching, and improved server-side rendering capabilities. The component architecture follows a modular design, making the codebase maintainable and scalable.

**TypeScript**: Provides compile-time type checking, reducing runtime errors and improving developer experience. All components, utilities, and data structures are fully typed, ensuring consistency across the application.

**Vite**: Delivers lightning-fast hot module replacement during development, with build times significantly faster than traditional bundlers. The development server starts instantly, and changes reflect in milliseconds.

**Tailwind CSS**: Implements utility-first styling for rapid UI development. The configuration integrates seamlessly with the component library, ensuring consistent design tokens across the application.

**shadcn/ui**: Provides a collection of high-quality, accessible UI components built on Radix UI primitives. These components are customizable and follow modern design patterns, ensuring a polished user experience.

### Desktop Application Layer

**Electron Framework**: Wraps the React application in a native desktop container, providing access to system-level APIs while maintaining web technology advantages. The main process handles file system operations, window management, and inter-process communication.

**electron-builder**: Manages the packaging and distribution process, generating installers for Windows (.exe), macOS (.dmg), and Linux (.AppImage/.deb) from a single codebase.

<div style="background-color: black; display: flex; align-items: center; justify-content: center;">
  <video controls width="100%" ><source src="/source/vocab.mp4"></video>
</div>
