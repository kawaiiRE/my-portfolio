import React, { useState } from 'react'
import { Box, VStack, Link, Flex, HStack, Button } from '@chakra-ui/react'
import { ColorModeButton } from '../ui/color-mode'
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogBackdrop
} from '../ui/dialog'
import { numbers } from '../common/predefined'
import {EmailButton, GithubButton, LinkedinButton} from '../common/icons/Buttons'

const projects = [
  { name: 'Crazy Sudoku', path: '/projects/crazySudoku' },
  { name: 'Local Business Website', path: '/projects/local-business' }
  // Add more projects as needed
]

function Sidebar ({
  isOpen = false,
  onClose,
  colors,
  navBarHeight,
  sideBarWidth
}) {
  const navigate = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Phone numbers
  const lebaneseNumber = '+96181977603'
  const saudiNumber = '+966546905184'

  // Open the dialog
  const openDialog = () => {
    setIsDialogOpen(true)
  }

  // Close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const handleScrollToSection = sectionId => {
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -50 // Adjust the offset as needed
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleOpenNewTab = (link, closeTheDialog) => {
    console.log({link})
    const newTab = window.open(link, '_blank')
    if (newTab) {
      newTab.focus()
    }
    if (closeTheDialog) {
      closeDialog()
    }
  }

  const linkStyles = {
    fontWeight: 'bold',
    fontSize: 'lg', // Make text slightly bigger
    color: colors.textInverted,
    p: 2, // Add padding for spacing
    borderRadius: 'md',
    _hover: {
      bg: colors.background, // Change background color on hover
      color: colors.text, // Optional: change text color on hover
      textDecoration: 'none' // Remove underline on hover
    },
    zIndex: 10,
    width: '100%'
  }

  return (
    <Box
      bg={colors.backgroundInverted}
      p={4}
      // display={isOpen ? 'block' : 'none'}
      width={{ base: '100%', md: sideBarWidth }}
      height='100vh'
      position='fixed'
      top={0}
      left={0}
      zIndex={999}
      transition='all 0.3s ease-in-out'
      transform={isOpen ? 'translateX(0)' : 'translateX(-100%)'}
      // paddingTop='70px'
      paddingTop='0px'
      borderRight='1px solid'
      // borderColor={colors.border}
    >
      <Box
        position='absolute'
        bottom='0'
        right='0'
        width='100%'
        height='100%'
        zIndex={0}
        opacity='0.3'
        bg='transparent'
        backgroundImage={`radial-gradient(${colors.gradientColor} 2px, transparent 0)`}
        backgroundSize='15px 13px'
        // transform={`translateX(${scrollProgress * 400}px)
        //      translateY(${scrollProgress * 500}px)
        //  rotate(45deg)`}
        transition='transform 0.2s ease'
        clipPath=' polygon(0 0, 100% 50%, 0 100%, 0 50%)'
      />

      <Flex
        height={navBarHeight} // Full height of the Box
        justify='center' // Horizontally center the content
        align='center' // Vertically center the content
      >
        <ColorModeButton />
      </Flex>
      <VStack align='start' spacing={0} mt={8} zIndex={10} gap={0}>
        <Link
          onClick={() => handleScrollToSection('introSection')}
          {...linkStyles}
        >
          Intro
        </Link>
        <Link
          onClick={() => handleScrollToSection('expertiseSection')}
          {...linkStyles}
        >
          Expertise
        </Link>
        <Link
          onClick={() => handleScrollToSection('toolsSection')}
          {...linkStyles}
        >
          Tools
        </Link>
        <Link
          onClick={() => handleScrollToSection('projectsSection')}
          {...linkStyles}
        >
          Projects
        </Link>
        <Box>
          <VStack align='start' pl={4} spacing={2}>
            {projects.map(project => (
              <Link
                key={project.name}
                onClick={() => navigate(project.path)}
                {...linkStyles}
                fontSize='md' // Slightly smaller for sub-links
                fontWeight='normal'
              >
                {project.name}
              </Link>
            ))}
          </VStack>
        </Box>
        <Link
          onClick={() => handleScrollToSection('contactSection')}
          {...linkStyles}
        >
          Contact
        </Link>
      </VStack>
      {/* Social Media Links */}
      <Flex
        position='absolute'
        bottom='16px'
        left='0'
        right='0'
        justifyContent='center'
        alignItems='center'
        zIndex={10}
      >
        <HStack spacing={8} justifyContent='space-evenly' w='90%'>
          <LinkedinButton/>
          <GithubButton />
          <Box
            as={FaWhatsapp}
            size='24px'
            color='#25D366' // WhatsApp green
            _hover={{ transform: 'scale(1.2)' }} // Slightly enlarge on hover
            transition='transform 0.2s ease'
            // onClick={() => handleOpenNewTab('https://wa.me/your-number')}
            onClick={openDialog}
            cursor='pointer'
          />
            <EmailButton withBg={false}/>
        </HStack>
      </Flex>
      <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogBackdrop />

        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>Select a Phone Number</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Button
              width='100%'
              colorScheme='whatsapp'
              onClick={() =>
                handleOpenNewTab(`https://wa.me/${numbers.lebanese.number}`, true)
              } // Lebanese number
              mb={2}
            >
              Contact via Lebanese Number
            </Button>
            <Button
              width='100%'
              colorScheme='whatsapp'
              onClick={() =>
                handleOpenNewTab(`https://wa.me/${numbers.saudi.number}`, true)
              } // Saudi number
            >
              Contact via Saudi Number
            </Button>
          </DialogBody>
          <DialogFooter>
            {/* Any additional footer content can go here */}
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  )
}

export default Sidebar
