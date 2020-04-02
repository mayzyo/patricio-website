using PatricioPersonal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatricioPersonal.Utilities
{
    public class QuoteMaker
    {
        private Quote[] quotes = new Quote[]{
            new Quote(){
                Message = "Music is like a dream. One that I cannot hear.",
                Author = "Ludwig van Beethoven"
            },
            new Quote(){
                Message = "Without music, life would be a blank to me.",
                Author = "Jane Austen"
            },
            new Quote(){
                Message = "Music is love, love is music, music is life, and I love my life. Thank you and good night.",
                Author = "A. J. McLean"
            },
            new Quote(){
                Message = "Music is the strongest form of magic.",
                Author = "Marilyn Manson"
            },
            new Quote(){
                Message = "Music washes away from the soul the dust of everyday life.",
                Author = "Berthold Auerbach"
            },
            new Quote(){
                Message = "Life seems to go on without effort when I am filled with music.",
                Author = "George Eliot"
            },
            new Quote(){
                Message = "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.",
                Author = "Plato"
            },
            new Quote(){
                Message = "Music is a way to dream together and go to another dimension.",
                Author = "Cecilia Bartoli"
            },
            new Quote(){
                Message = "Music in the soul can be heard by the universe.",
                Author = "Lao Tzu"
            },
            new Quote(){
                Message = "Music can change the world because it can change people.",
                Author = "Bono"
            },
            new Quote(){
                Message = "The music is not in the notes, but in the silence between.",
                Author = "Wolfgang Amadeus Mozart"
            },
            new Quote(){
                Message = "Music is the divine way to tell beautiful, poetic things to the heart.",
                Author = "Pablo Casals"
            },
            new Quote(){
                Message = "After silence, that which comes nearest to expressing the inexpressible is music.",
                Author = "Aldous Huxley"
            },
            new Quote(){
                Message = "If I had my life to live over again, I would have made a rule to read some poetry and listen to some music at least once every week.",
                Author = "Charles Darwin"
            },
            new Quote(){
                Message = "Music is a weapon in the war against unhappiness.",
                Author = "Jason Mraz"
            },
            new Quote(){
                Message = "One good thing about music, when it hits you, you feel no pain.",
                Author = "Bob Marley"
            },
            new Quote(){
                Message = "Music is forever; music should grow and mature with you, following you right on up until you die.",
                Author = "Paul Simon"
            },
            new Quote(){
                Message = "Any good music must be an innovation.",
                Author = "Les Baxter"
            },
            new Quote(){
                Message = "Music drives you. It wakes you up, it gets you pumping. And, at the end of the day, the correct tune will chill you down.",
                Author = "Dimebag Darrell"
            },
            new Quote(){
                Message = "Music is an outburst of the soul.",
                Author = "Frederick Delius"
            },
            new Quote(){
                Message = "Music is well said to be the speech of angels.",
                Author = "Thomas Carlyle"
            },
            new Quote(){
                Message = "Music is the mediator between the spiritual and the sensual life.",
                Author = "Ludwig van Beethoven"
            },
            new Quote(){
                Message = "Music is intended and designed for sentient beings that have hopes and purposes and emotions.",
                Author = "Jacques Barzun"
            },
            new Quote(){
                Message = "If music be the food of love, play on.",
                Author = "William Shakespeare"
            },
        };

        public List<Quote> Random(int amount)
        {
            if (amount > quotes.Length)
                throw new Exception("The requested amount of quotes is more than there are in total");

            Random rand = new Random();
            List<Quote> result = new List<Quote>(amount);

            for (int i = 0; i < amount; i++)
            {
                var quote = quotes[rand.Next(0, quotes.Length)];

                if (result.Contains(quote))
                {
                    for (int t = 0; t < amount; t++)
                    {
                        if (quotes[t] != quote)
                        {
                            quote = quotes[t];
                            break;
                        }
                    }
                }

                result.Add(quote);
            }

            return result;
        }
    }
}
