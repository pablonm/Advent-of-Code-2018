const _ = require('lodash')
const tracks = [
'                /----------------------------------------------------------------------------------------------\\                                      ',
'   /------------+-----\\                                                                   /--------------------+-----------------\\                    ',
'   |            |     |                                      /-------------------->-------+<-------------------+------\\         /+-------------\\      ',
'   |            |     |                                  /---+------\\                     |                    |      |         ||             |      ',
'   |            |     |                               /--+---+------+---------------------+--------------------+------+---------++---\\  /------+----\\ ',
'   |            |     |                               |  |   |      |         /-----------+--------------------+------+---------++\\  |  |      |    | ',
'   |            |     |    /----------------\\         |  |   |      |         |           |               /----+------+---------+++--+--+------+----+\\',
'   |            |     |    |  /-------------+---------+--+---+------+---------+-----------+-----\\         |    |      |         |||  |  |      |    ||',
'   |            |     |    |  |             |         |  |   | /----+---------+-----------+-----+---------+----+----->+----\\    |||  |  |      |    ||',
'   |            |     |    |  |             |         |  |   | |    |    /----+-----------+-----+---------+----+------+----+----+++--+\\ |      |    ||',
'   |            |     |    |  |             |     /---+--+---+-+----+\\   |    |           |     |         |    |      |    |    |||  || |      |    ||',
'   |            |     |    |  |             |     |   |  |   | |/---++---+----+-----------+-----+---------+--\\ |      |    |    |||  || |      |    ||',
'   |            |     |    |  |             |     |   |  |   | ||   ||   |    |           |     |         |  | |      |    |    |||  || |      |    ||',
'   |            |   /-+----+--+-------------+---\\ |   |  |   | ||   ||/--+----+-----------+-----+---------+--+-+----\\ |    |    |||  || |      |    ||',
'   | /----------+---+-+----+--+-------------+---+-+---+--+---+-++---+++--+----+-----------+-----+------\\  |  | |    | |    |    |||  || |      |    ||',
'   | |          |   | |    |  |             |   | |   |  |   | ||   |||  |    |           |     |      |  |  | |    | |    |    |||  || \\------+----/|',
'   | |          |   | |    |  |             |/--+-+---+--+---+-++---+++--+----+-----------+-----+------+--+--+-+----+-+<---+----+++\\ ||        |     |',
'   | |         /+---+-+----+--+-------------++-\\| |   |  |   | ||   |||  |    |   /-------+-----+------+--+<-+-+-\\  | |    |    |||| ||        |     |',
'   | |         ||   | |    |  |             || || |   |  |   | ||   |||  |    |   |       |     |      |  |  | | |  | |/---+----++++-++----\\   |     |',
'   |/+--------\\||   | |    | /+-----------\\ || || |   |  |   | ||   |||  |    |   |       |   /-+------+--+--+-+-+--+-++---+----++++-++----+---+--\\  |',
'   |||        |||   | |    | ||           | || || |   |  |   | ||   |||  |    |   |   /---+---+-+------+--+--+-+-+--+-++---+----++++-++----+-\\ |  |  |',
'   |||        |||   | |    | ||        /--+-++-++-+---+\\ |  /+-++---+++--+----+---+---+---+---+>+------+--+--+-+-+--+-++---+-\\  |||| ||    | | |  |  |',
'   |||      /-+++---+-+\\   | ||        |  | || || \\---++-+--++-++---+/|  |    |   |   |   |   | |      |  |  | | |  | ||   | |  |||| ||    | | |  |  |',
'   |||      | |||   | ||   |/++--------+--+-++-++-----++-+--++-++---+-+--+----+---+---+---+---+-+\\     |  |  | | |  | ||   | |  |||| ||    | | |  |  |',
'   |||      | |||   | ||   ||||        |  | || ||     || |  |\\-++---+-+--+----+---+---+---+---+-++-----+--+--+-+-+--+-/|   | |  |||| ||    | | |  |  |',
'   |||      | |||   \\-++---++++--------+--+-++-+/     || |  |  ||   | |  |    |   |   |   |   | ||     |  |  | | |  |  | /-+-+--++++-++----+-+-+--+\\ |',
'   |||      | |||     ||   ||||        |  | || |    /-++-+--+--++---+-+--+----+---+---+---+---+-++-\\   |  |  | | |  |  | | | |  |||| ||    | | |  || |',
'   |||     /+-+++-----++---++++--------+--+-++-+----+-++-+--+--++---+-+--+----+---+---+---+---+-++-+---+--+\\ | | |  |  | | | |  \\+++-++----+-+-/  || |',
'   |||     || ||\\-----++---++++--------+--+-++-+----+-++-+--+--++---+-+--+----+---+---+---+---+-++-+---+--++-+-/ |  |  | | | |   ||| ||    | |    || |',
'   |||     || ||    /-++---++++--------+--+-++-+----+-++-+--+--++---+-+--+----+---+---+---+---+-++-+---+--++-+---+--+--+-+-+-+--\\||| ||    | |    || |',
'   |||     || ||    | ||   ||||        |  | || |    | || |  |  ||   | |  |    |  /+---+---+---+-++-+---+--++-+---+--+--+-+-+-+--++++-++----+-+----++\\|',
'   |||     || ||    | ||   ||||        |  | || |    | ||/+--+--++---+-+--+----+\\ ||   |   |   | || |   |  || |   |  |  | | | |  |||| ||    | |    ||||',
'   |||     || ||    | || /-++++--------+--+-++-+----+-++++--+--++---+-+--+----++-++---+---+---+-++\\|   |  || |   |  |  | | | |  |||| ||    | |    ||||',
'   |||     |\\-++----+-+/ | ||||    /---+--+-++-+----+-++++--+--++---+-+--+----++-++---+---+---+-++++---+\\ || |   |  |  | | | |  |||| ||    | |    ||||',
'   |||     |  ||    | |  | ||||    |   |  | || |    | ||||  |  ||   | |  |    || ||   |   |   | ||||   || || |   | /+--+-+-+\\|  |||| ||    | |    ||||',
'   |||     |  ||    | |  | ||||    |   |  | || |    | ||||  |  ||   | |  |    || ||   |   |   | ||||   || || |   | ||  | | |||  |||| ||    | |    ||||',
'   |||     |  || /--+-+--+-++++----+---+--+-++-+----+-++++--+--++---+-+--+----++-++---+---+---+-++++---++-++-+---+-++\\ | | |||  |||| ||    | |    ||||',
'/--+++-----+--++-+--+-+--+-++++----+---+--+-++-+----+-++++--+--++---+-+--+--\\ || ||   |   | /-+-++++---++-++-+---+-+++-+-+-+++--++++-++---\\| |    ||||',
'|  |||     |  || |  \\-+--+-++++----+---+--+-++-+----+-++++--+--++---+-+--+--+-++-++---+---+-+-+-++++---++-++-+---+-+++-+-+-+++--/||| ||   || |    ||||',
'|  |||     |  || |  /-+--+-++++----+---+--+-++-+----+-++++--+--++-\\ | |  |  | || ||   |   |/+-+-++++---++-++-+---+\\||| | | |||   ||| ||   || |    ||||',
'|  |||     |  || |  | |  | ||||    |   |/-+-++-+----+-++++--+--++-+-+-+--+--+-++-++---+---+++-+-++++---++-++-+\\  ||||| | | |||   ||| ||   || |    ||||',
'| /+++-----+--++-+--+-+--+-++++----+---++-+-++-+----+-++++--+--++-+-+-+--+--+-++-++---+---+++-+-++++---++\\|| ||  ||||| | | |||   ||| ||   || |    ||||',
'| ||||     |  || |  | |  | ||||    |   || | || |    | \\+++--+--++-+-+-+--+--+-++-++---+---+++-+-++++---+++++-++--+++++-+-+-+++---+++-/|   || |    ||||',
'| ||||     \\--++-+--+-+--+-++++----+---++-+-++-+----+--+++--+--++-+-+-+--+--+-++-++---+---+++-+-++++---++++/ ||  ||||| | | |||   |||  |   || |    ||||',
'| ||||        || |  | |  | ||||    |   || | ||/+----+--+++-\\|  || | | |  |  | || ||   |/--+++-+-++++\\  ||||  ||  ||||| | | |||   |||  |   || |    ||||',
'| ||||        || |  | |  | ||||    |   || | ||||/---+--+++-++--++-+>+-+--+--+-++-++---++-\\||| | |||||  ||||  ||  ||||| | | |||   |||  |   || |    ||||',
'| ||||        || |  | |  | ||||    |   || | |||||   |  ||| |\\--++-+-+-+--+--+-++-++---++-++++-+-+++++--++++--++--+++++-+-+-++/   |||  |   || |    ||||',
'| ||||        || |  | |  | ||||    |   || | |||||   |  ||| |   || |/+-+--+--+-++-++---++-++++-+-+++++--++++--++--+++++-+-+-++\\   |||  |   || |    ||||',
'| ||||       /++-+--+-+--+-++++----+---++-+-+++++---+-\\||| |   || ||| |  |  | || ||   || |||| | |||||  ||||  ||  ||||| | | |||   |||  |   || v    ||||',
'| ||||  /----+++-+--+-+--+-++++----+---++-+-+++++---+-++++-+---++-+++\\|  |  | \\+-++---++-++++-+-+++++--++++--++--+++++-+-+-+++---+/|  |   || |    ||||',
'| ||||  |/---+++-+--+-+--+-++++----+---++-+-+++++---+-++++-+---++-+++++--+--+--+\\||   || |||| | |||||  ||||  ||  ||||| | | |||   | |  |   || |    ||||',
'| ||||  ||   ||| |  | |  | ||||    |   || | |||||/--+-++++-+---++-+++++--+--+--++++---++-++++-+-+++++--++++-\\||  ||\\++-+-+-+/|   | |  |   || |    ||||',
'| |\\++--++---+++-+--+-/  | ||||    |   \\+-+-++++++--+-+/|| |/--++-+++++--+--+--++++---++-++++-+-+++++--++++-+++--++-++-+-+-+-+---+-+--+-\\ || |    ||||',
'| | ||  ||   ||| |  |    | ||||    |    | | ||||||  | | || ||  || |||||  |  |  ||||   || ||\\+-+-+++++--++++-+++--+/ || | | | |   | |  | | || |    ||||',
'| | ||  ||/--+++-+--+----+-++++----+----+-+-++++++--+-+-++-++--++-+++++--+--+-\\||||   || || | | |||||  |||| |||  |  || | | | |   | |  | | || |    ||||',
'| | ||  |||  ||| |  |    | ||||    |    | | ||||||  | | || ||  || ||||\\--+--+-+++++---++-++-+-+-+++++--++++-+++--+--/| | | | |   | |  | | || |    ||||',
'| | \\+--+++--+/| |  |    | ||||    |    | | ||||||  | | || ||  || ||||   |  | |||||   || |\\-+-+-+++++--++++-+++--+---+-+-+-+-+---/ |  | | || |    ||||',
'| |  |  |||  | | |  |    | ||||    |    | | ||||||/-+-+-++-++--++-++++---+--+-+++++---++-+--+-+-+++++--++++-+++--+---+-+\\| | |     |  | | || |    ||||',
'| |  |  |||  | | |  \\----+-++++----+----+-+-+++++++-+-+-++-++--++-/|||   |  | |||||   ||/+--+-+-+++++--++++-+++\\ |   | ||| | |     |  | | || |    ||||',
'| |  |  |||  | | |       | ||||    |    | | ||\\++++-+-+-++-/|/-++--+++---+--+-+++++-\\ |||| /+-+-+++++--++++-++++-+---+-+++\\| |     |  | | || |    ||||',
'| |  | /+++--+-+-+-------+-++++----+----+-+-++-++++-+-+-++--++\\||  |||   |  | ||||| | |||| || | |||||  |||| |||| |   | ||||| |     |  |/+-++-+---\\||||',
'| |  | ||||  | | |       | ||||    |    | | || |||| | | ||  |||||  |||   |  | ||||| | |||| || | |||||  |||| |||| |   | ||||| |     |  ||| || |   |||||',
'| |  | ||||  | | |       | ||||    |    | | || |||| | | ||  |||||  |||   |  | ||||\\-+-++++-++-+-+++++--++++-++++-/   | ||||| |     |  ||| || |   |||||',
'| |  | ||||  | | |       | ||||    |    | | || |||| | | ||  |||||  |||   |  | ||||  | ||||/++-+-+++++--++++-++++-----+-+++++-+--\\/-+--+++-++-+--\\|||||',
'| |  | ||||  | | |       | ||||    |    | | || |||| | | ||  |||||  |||   |  | ||||  | |\\+++++-+-++++/  |||\\-++++-----+-+++++-+--++-+--+++-++-+--+++++/',
'| |  | ||||  | | |     /-+-++++----+--\\ | | || |||| | | ||  |||||  |||   |/-+-++++--+-+-+++++-+\\||||   |||  ||||     | ||||| |  || |  ||| || |  ||||| ',
'| |  | ||||  | | |     | | ||||    |  | | | || |||| | | ||  |||||  |||   || | ||||  | | ||||| ||||||   |||  ||||     | ||||| |  || |  ||| || |  ||||| ',
'| |  | ||||  | | |     | | \\+++----+--+-+-+-/| |||| | | ||  |||||  |||   || | ||||  | | ||||| ||||||   |||  ||||     | ||||| |  || |  ||| || |  ||||| ',
'| |  | |||\\--+-+-+-----+-+--+++----+--+-+-+--+-++++-+-+-++--+++++--+++---++-+-/|||  |/+-+++++-++++++---+++\\ ||||     | ||||v |  || |  ||| || |  ||||| ',
'| |  | |||   | | |     | |  |||    |  | |/+--+-++++-+-+\\||  |||||  |||   || |  |||  ||| |||||/++++++---++++-++++-----+-+++++-+--++-+-\\||| || |  ||||| ',
'| |  | |||   | | |/----+-+--+++\\   |  | |||  | ||\\+-+-++++--+++++--+++---++-+--+++--+++-++++++++++++---++++-/|||    /+-+++++-+--++-+-++++-++-+-\\||||| ',
'| |  | |||   | | ||    | |  |\\++---+--+-++/  | || | | ||||  ||||\\--+++---++-+--+++--+++-++++++++++++---++++--/||    || ||||| |  || | |||| || | |||||| ',
'|/+--+-+++---+-+-++----+-+--+-++---+--+-++---+-++-+-+-++++--++++---+++---++-+--+++--+++-++++++++++++-\\ ||||   ||    || ||||| |  || | |||| || | |||||| ',
'|||  | |||   | | ||  /-+-+--+-++---+--+-++---+-++-+-+-++++--++++-\\ |||   || |  |||/-+++-++++++++++++-+-++++---++----++-+++++-+--++-+\\|||| || | |||||| ',
'^||  | |||   | | ||  | | |  | ||   |  | ||   \\-++-+-+-++++--++++-+-+++---++-+--++++-+++-++++++++++++-+-++++---++----++-+++++-+--++-/||||| || | |||||| ',
'|||  | |||   | | ||  | | |  | ||   |/-+-++-----++-+-+-++++--++++-+-+++---++-+--++++-+++>++++++++++++-+-++++---++----++-+++++-+\\ ||  ||||| || | |||||| ',
'|||  | \\++---+-+-++--+-+-+--+-++---++-+-++-----++-+-+-++++--++/| | |||   || |  |||| ||| \\+++++++++++-+-++++---+/    || ||||| || |\\--+++++-++-+-+/|||| ',
'|||  |  ||   | | ||  | | |  | ||   || | ||     || | | ||||  || | |/+++---++-+--++++-+++--+++++++++++-+-++++\\  |     || ||||| || |   ||||| || | | |||| ',
'|||  |  ||   | | ||  | | |  | ||   || | ||    /++-+-+-++++--++-+-+++++--\\|| |  |||| |||  ||||||||||| | |||||  | /---++-+++++-++-+---+++++\\|| | | |||| ',
'|||  |  ||   | | ||  | | |  | ||   || | ||    ||| | | ||||  || | |||||  ||| |  |||| ||\\--+++++++++++-+-+++++--+-+---++-+++++-++-+---++++++++-/ | |||| ',
'|||  |  ||   | | || /+-+-+--+-++---++-+-++----+++\\| | ||||  || | |||||  |\\+-+--++++-++---+++++++++++-+-+++++--+-+---++-+++++-++-+---++/|||||   | |||| ',
'|||  |  ||   |/+-++-++-+-+--+-++---++-+-++----+++++\\| ||||  || | |||||  | | |  |||| ||   ||||||||||| | |||||  | |   || ||||| || |   || |||||   | |||| ',
'|||  |  ||   ||| || || | |  | ||   || | ||    ||||||| ||||  |\\-+-+++++--+-+-+--++++-/|   ||||||||||| | |||||  | |   || ||||| || |   || |||||   | |||| ',
'|||  |  ||   |||/++-++-+-+--+-++---++-+-++----+++++++-++++--+--+-+++++--+-+-+--++++--+---+++++++++++\\| |||||  | |   || ||||| || |   || |||||   | |||| ',
'|||  |  ||   |||||| || |/+--+-++---++-+-++----+++++++-++++--+--+-+++++--+-+-+--++++--+-\\ v|||||||||||| |||||  | |   || ||||| || |   || |||||   | |||| ',
'|||  |  ||   |||||| || |||  | ||   || | ||    ||||||| ||||  |  | |||||  | | |  ||||  | | |||||||||||||/+++++--+-+---++-+++++-++-+---++-+++++---+-++++\\',
'|||  |  ||   |||||| || |||/-+-++---++\\| ||    ||||||| ||||  |  \\-+++++--+-+-+--++++--+-+-+++++++++++++++++++--+-+---++-++++/ || |   || |||||   | |||||',
'|||  |  ||   |||||| || |||| | ||   |||| ||    ||||||\\-++++--+----+++++--+-+-+--++++--+-+-++++++++++/||||||||  | |   || ||||  || |   || |||||   | |||||',
'|||  |  ||   |||||| || |||| | ||   |||| ||    ||||||  ||||  |    |||||  | | |  |||v  \\-+-++++++++++-++++++/|  | |   || ||||  || |   || |||||   | |||||',
'|||  |  ||  /++++++-++\\|||| |/++---++++-++----++++++--++++--+----+++++--+-+-+--++++----+-++++++++++-++++++-+--+-+---++-++++--++-+\\  || |||||   | |||||',
'|||  |  ||  |\\+++++-+++++++-++++---++++-++----++++++--/||\\--+----+++/|  | | |  ||||    | |||||\\++++-++++++-+--+-+---++-++++--++-++--++-+++++---+-+/|||',
'|||  |  ||  | ||||| ||||||| ||||   |||| ||  /-++++++---++---+----+++-+--+-+-+--++++----+-+++++-++++-++++++-+--+-+---++-++++--++\\||  || |||||   | | |||',
'|||  |  ||  | ||||| ||||||| ||||   |||| ||  | ||||||   ||   |    ||| |  | | |  ||||    | ||||\\-++++-++++++-+--+-+---++-++++--+++++--+/ |||||   | | |||',
'|||  \\--++--+-+++++-+++++++-++++---++++-++--+-++++++---++---+----+++-+--+-+-+--++++----+-++++--++++-+++/|| |  | |   || ||||  |||||  |  |||||   | | |||',
'||| /---++--+-+++++-+++++++-++++---++++-++--+-++++++---++---+----+++-+--+-+-+--++++----+-++++-\\|||| ||| || |  | |   || ||||  |||||  |  |||||   | | |||',
'||| |   ||  | ||||| ||||||| ||||   |||| ||  | ||||||   ||   |    ||| |  | | |  ||||    | |||| ||||| ||| || |  | |   || \\+++--+++++--+--++++/   | | |||',
'||| |   ||  | ||||| ||||||| ||||   |\\++-++--+-++++++---++---+----+++-+--+-+-+--++++----+-++++-+++++-+++-++-+--+-+---++--+++--+/|||  |  ||||    | | |||',
'||| |   ||  | ||||| ||||||| ||||/--+-++-++--+-++++++---++---+---\\||| |  | | | /++++----+-++++-+++++-+++-++-+\\ | |   ||  |||  | |||  |  ||||    | | |||',
'|\\+-+---++--+-+++++-+++++++-+++++--+-++-++--+-++++++---++---+---++++-+--+-+-+-+++++----+-++++-+++++-+/| || || | |   ||  |||  | |||  |  ||||    | | |||',
'| | |   ||  | ||||| ||||||| |\\+++--+-++-++--+-++++++---++---+---++++-+--+-+-+-+++++----+-++++-+++++-+-+-++-++-+-+--<++--+++--+-++/  |  ||||    | | |||',
'| | |   ||  | ||||| |||\\+++-+-+++--+-+/ ||  | ||||||   ||   \\---++++-+--+-+-+-+++++----+-++++-+++++-+-+-++-++-+-+---++--+++--+-++---+--+/||    | | |||',
'| | |   \\+--+-+++++-+++-+++-+-+++--+-+--++--+-++++++---++-------++++-/  | | | |||\\+----+-++++-+++++-+-+-++-++-+-+---++--+++--+-++---+--+-++----+-+-+/|',
'| | |    |  | ||||| ||| ||| \\-+++--+-+--++--+-++++++---++-------++++----+-+-+-+++-+----+-++++-+++/| | | || || | |   ||  |||  | ||   |  | ||    | | | |',
'| | |    |  | ||||| ||| |||   |||  | |/-++--+-++++++---++-------++++----+-+-+-+++-+----+-++++-+++-+-+-+-++-++-+-+---++--+++--+-++---+--+\\||    | | | |',
'| | |    |  | ||||| ||| |||   |||  | || ||/-+-++++++---++-------++++----+-+-+-+++-+\\   | |||| ||| | | | || || | |   ||  |||  | ||   |  ||||    | | | |',
'| | |    |  |/+++++-+++-+++---+++--+\\|| ||| | ||||||   ||     /-++++----+-+-+-+++-++---+-++++-+++-+-+-+-++-++-+-+---++--+++--+-++---+--++++\\   | | | |',
'| | |    |  ||||||| ||| |||   |||  |||| ||| | ||||||   ||  /--+-++++----+-+-+-+++-++---+-++++-+++-+-+-+-++-++-+-+>\\ ||  |||  | ||   |  |||||   | | | |',
'| | |    |  ||||||| ||| |||   |||  |||| ||| | ||||||   ||  |  | ||||    | \\-+-+++-++---+-++++-+/| | | | || || | | | ||  |||  | ||   |  |||||   | | | |',
'| | |    |  ||||||| ||| |||   |||/-++++-+++-+-++++++---++--+--+-++++----+---+-+++-++---+-++++-+-+-+-+-+-++-++-+-+-+-++--+++--+-++---+-\\|||||   | | | |',
'| | |    |  ||||||| ||| |||   \\+++-++++-+++-+-++++++---++--+--+-++++----+---+-+++-++---+-++++-+-/ | | | || || | | | ||  |||  | ||   | ||||||   | | | |',
'| | |    |  ||||||| ||| |||    ||| |||| \\++-+-++++++---++--+--+-++++----+---+-+++-++---+-++++-+---+-+-+-++-++-/ | | ||  |||  | ||   | ||||||   | | | |',
'| | |  /-+--+++++++-+++-+++----+++-++++--++-+-++++++---++--+--+-++++----+---+-+++-++---+-++++-+---+-+-+-++-++---+-+\\||  |||  | ||   | ||||||   | | | |',
'| | |  | |  ||||||| ||| |||    ||| ||||  || | ||\\+++---++--+--+-++++----+---+-+++-++---+-/||| |   | | | || ||   | ||||  |||  | ||   | ||||||   | | | |',
'| | |  | |  ||||||| ||| |||    ||| ||||  || | || |||   ||  |  | ||||    |   | ||| ||   |  ||| |   | | | || ||   | ||||  |||  | ||   | ||||||   | | | |',
'| | |  | |  |||\\+++-+++-+++----+++-++++--++-+-+/ |||   ||  |  | ||\\+----+---+-+++-++---+--+++-+---+-+-+-++-/|   | ||||  |||  | ||   | ||||||   | | | |',
'| | |  | |  ||| ||| ||| |||    ||| ||||  || | |  |||   ||  |  | || |    |   | ||| ||   |  ||| |   | | | ||  |   \\-++++--+++--+-++---+-+++/||   | | | |',
'| | |  | |  ||| ||| |\\+-+++----+++-++++--++-+-+--+++---++--+--+-+/ |    |   | ||| ||   |  ||| |   | | | ||  |     ||||  |||  | ||   | ||| ||   | | | |',
'| | |  | |  ||| ||| | | |||    ||| ||||  || | |  |||   ||  |  | |  |    |   | ||| ||   |  ||| |   | | | ||  |     ||||  |||  | ||   | ||| ||   | | | |',
'| \\-+--+-+--+++-+++-+-+-+++----+++-++++--++-+-+--+++---++--+--+-+--+----+---+-+++-++---+--+++-+---+-+-+-+/  |     ||||  |||  | ||   | ||| ||   | | | |',
'|   |  | |  ||| ||| | | |||    ||| ||||  || | |  |||   ||  |  | |  |    |   | ||| ||   |  ||| |   | | | |   |     ||||  |||  | ||   | ||| ||   | | | |',
'|   |  | |  ||| ||| | | |||    ||| ||||  || | \\--+++---++--+--+-+--+----/   | ||| ||   |  ||| |   | | | |   |     ||\\+--+++--+-++---+-+++-++---/ | | |',
'\\---+--+-+--+++-+++-+-+-+++----+++-++++--++-+----+++---++--+--+-+--+--------/ ||| ||   |  ||| |   | | | |   |     || |  |||  | ||   | ||| ||     | | |',
'    |  | |  ||| ||| | | |||    ||| ||||  || |    |||   ||  |  \\-+--+----------+++-++---+--+++-+---+-+-+-+---+-----++-+--+++--+-++---+-+++-+/     | | |',
'    |  | |  ||| ||| | | \\++----+++-++++--++-+----+++---++--+----+--+----------+++-++---/  ||| |   | | | |   |     || |  |||  | ||   | |\\+-+------/ | |',
'    |  | |  ||| ||| | |  ||    ||| ||||  || |    |||   ||  |    |/-+----------+++-++--\\   ||| |   | | | |   |     || |  |||  | ||   | | | |        | |',
'    |  | |  ||| ||| | |  ||    ||| ||||  || |    |||   ||  |    || |          ||| ||  |   ||| |  /+-+-+-+---+-----++-+--+++--+-++---+-+-+\\|        | |',
'    |  | |  ||| ||| | |  ||    ||| ||||  || |    |||   ||  |    || \\----------+++-++--+---+++-+--++-+-+-+---+-----++-+--+++--/ ||   | | |||        | |',
'    |  | |  ||| ||| | |  \\+----+++-++++--++-+----+++---++--+----++------------+++-++--+---+++-+--+/ | | |   |     || |  |||    ||   | | |||        | |',
'    |  | |  |\\+-+++-+-+---+----+++-+/||  || |    |||   ||  |    ||            ||| ||  |   \\++-+--+--+-+-+---+-----++-+--+++----+/   | | |||        | |',
'    |  | |  | | ||| \\-+---+----+++-+-++--++-+----/||   ||  |    ||            ||| ||  |    || |  |  | | |   |     || |  |||    |    | | |||        | |',
'    |  | |  | \\-+++---+---+----+++-+-++--++-+-----+/   ||  |    ||            \\++-++--+----++-+--+--+-+-+---/     || |  |\\+----+----+-+-+++--------/ |',
'    |  | |  |   |||   |   v    ||| \\-++--++-+-----+----++--+----++-------------++-++--+----++-+--+--+-+-/         || |  | |    |    | | |||          |',
'    |  | |  |   |||   |   |    |\\+---++--++-+-----+----++--+----/|             || || /+----++-+--+--+-+-----------++-+--+-+----+---\\| | |||          |',
'    |  \\-+--+---+++---+---+----+-+---++--++-+-----+----++--+-----+-------------++-++-++----++-+--+--+-+-----------+/ |  | |    |   || | |||          |',
'    |    |  |   |||   |   |    | |   ||  || |     |    |\\--+-----+-------------/| || ||    || |  |  | |           |  |  | |    |   || | |||          |',
'    |    |  |   |||   |   |    | |   ||  || \\-----+----+---+-----+--------------+-++-++----++-+--+--+-+-----------+--+--+-+----/   || | |||          |',
'    |    |  |   |||   |   |    | |   ||  ||       |    |   |     \\--------------+-++-+/    \\+-+--+--+-+-----------+--+--+-/        || | |||          |',
'    |    |  |   |||   |   |    | |   ||  \\+-------+----/   |                    | || |      | |  |  | \\-----------+--+--+----------++-+-+++----------/',
'    |    |  |   |\\+---+---+----+-+---++---+-------+--------+--------------------+-++-+------+-+--+--+-------------+--/  |          || | |||           ',
'    |    \\--+---+-+---+---+----+-+---++---+-------+--------+--------------------/ || |      | |  |  |             |     |          || | |||           ',
'    |       |   | |   |   |    | |   ||   |       |        \\----------------------++-+------+-+--+--+-------------/     |          || | |||           ',
'    |       |   | |   |   |    | |   ||   |       |                               || \\------+-+--+--+-------------------+----------/| | |||           ',
'    |       |   | |   |   |    | \\---++---+-------+-------------------------------++--------+-+--+--+-------------------+-----------+-/ |||           ',
'    |       |   | |   |   |    |     ||   |       |                               ||        \\-+--+--+-------------------+-----------+---++/           ',
'    |       \\---+-+---/   |    |     ||   |       |                               \\+----------+--+--+-------------------+-----------/   ||            ',
'    \\-----------+<+-------+----+-----++---+-------+--------------------------------+----------/  |  |                   |               ||            ',
'                \\-+-------+----+-----++---+-------+--------------------------------+-------------+--/                   |               ||            ',
'                  |       \\----+-----/\\---+-------+--------------------------------+-------------+----------------------+---------------/|            ',
'                  \\------------/          |       \\--------------------------------+-------------+----------------------/                |            ',
'                                          \\----------------------------------------/             \\---------------------------------------/            ',
]

const initCarts = (tracks) => {
    let carts = []
    for (let i = 0; i < tracks.length; i++ )
        for (let j = 0; j < tracks[i].length; j++ )
            if (tracks[i][j] === '<' || tracks[i][j] === '^' || tracks[i][j] === '>' || tracks[i][j] === 'v')
                carts.push({ position: {x: i, y: j}, direction: tracks[i][j], intersections: 0, crashed: false })
    return carts
}

const rotateLeft = (direction) => {
    if (direction === '<') return 'v'
    if (direction === '^') return '<'
    if (direction === '>') return '^'
    if (direction === 'v') return '>'
}

const rotateRight = (direction) => {
    if (direction === '<') return '^'
    if (direction === '^') return '>'
    if (direction === '>') return 'v'
    if (direction === 'v') return '<'
}

const rotate = (cart) => {
    if (cart.intersections % 3 === 0) return rotateLeft(cart.direction)
    if (cart.intersections % 3 === 1) return cart.direction
    if (cart.intersections % 3 === 2) return rotateRight(cart.direction)
}

const corner = (direction, corner) => {
    if (corner === '/' && direction === '<') return 'v'
    if (corner === '/' && direction === '^') return '>'
    if (corner === '/' && direction === '>') return '^'
    if (corner === '/' && direction === 'v') return '<'
    if (corner === '\\' && direction === '<') return '^'
    if (corner === '\\' && direction === '^') return '<'
    if (corner === '\\' && direction === '>') return 'v'
    if (corner === '\\' && direction === 'v') return '>'
}

const moveCarts = (carts, tracks) => {
    let collision = null
    let newCarts = [...carts]
    for (let i = 0; i < carts.length; i++) {
        let nextCell
        let position = carts[i].position
        if (carts[i].direction === '<') nextCell = { x: position.x, y: position.y - 1 }
        if (carts[i].direction === '^') nextCell = { x: position.x - 1, y: position.y }
        if (carts[i].direction === '>') nextCell = { x: position.x, y: position.y + 1 }
        if (carts[i].direction === 'v') nextCell = { x: position.x + 1, y: position.y }
        nextCellContent = tracks[nextCell.x][nextCell.y]
        let cartsInCollisionPath = newCarts.filter(c => c.position.x === nextCell.x && c.position.y === nextCell.y)
        if (cartsInCollisionPath.length > 0) {
            collision = nextCell
            cartsInCollisionPath[0].crashed = true
            newCarts[i].crashed = true
        } else {
            newCarts[i].position = nextCell
            if (nextCellContent === '+') {
                newCarts[i].direction = rotate(newCarts[i])
                newCarts[i].intersections++
            }
            if (nextCellContent === '/' || nextCellContent === '\\') {
                newCarts[i].direction = corner(newCarts[i].direction, nextCellContent)
            }
        }
    }
    return { newCarts: newCarts.filter(c => !c.crashed), collision }
}

const firstCrashPoint = (tracks) => {
    let carts = initCarts(tracks);
    let collision = null
    while (!collision) {
        carts = _.sortBy(carts, [c => c.position.x, c => c.position.y])
        let tick = moveCarts(carts, tracks);
        carts = tick.newCarts
        collision = tick.collision
    } 
    return collision.y + ',' + collision.x
}
console.log('13-1 solution: ' + firstCrashPoint(tracks))

module.exports = {
    tracks,
    initCarts,
    rotateLeft,
    rotateRight,
    rotate,
    corner,
    moveCarts,
    firstCrashPoint,
}

