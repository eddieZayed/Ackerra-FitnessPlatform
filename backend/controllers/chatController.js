/**
 * Rule-based chat logic: checks userMessage for keywords
 * and returns a simple text response.
 */
exports.processChatMessage = (req, res) => {
    const userMessage = req.body.message || "";
    const lowerMsg = userMessage.toLowerCase();

// Default reply
let reply = "I'm here to listen and support you. Share what's on your mind, and I'll do my best to help you feel better.";


// 1. Emotional / Motivational
if (
    lowerMsg.includes("sad") || 
    lowerMsg.includes("depressed") || 
    lowerMsg.includes("feeling low") || 
    lowerMsg.includes("feeling down") || 
    lowerMsg.includes("unhappy") || 
    lowerMsg.includes("blue")
) {
    reply = "I'm really sorry you’re feeling that way. Remember, small steps can help. Maybe a short walk or gentle exercise could boost your mood?";
} else if (
    lowerMsg.includes("stress") || 
    lowerMsg.includes("anxious") || 
    lowerMsg.includes("stressed out") || 
    lowerMsg.includes("overwhelmed by stress") || 
    lowerMsg.includes("worried") || 
    lowerMsg.includes("nervous")
) {
    reply = "Stress is tough. Deep breathing or a quick workout break can help reset. How about a few minutes of stretching or a walk?";
} else if (
    lowerMsg.includes("no motivation") || 
    lowerMsg.includes("lost motivation") || 
    lowerMsg.includes("unmotivated") || 
    lowerMsg.includes("can’t find the energy") || 
    lowerMsg.includes("don’t feel like doing anything") || 
    lowerMsg.includes("feeling lazy")
) {
    reply = "Motivation can fluctuate. Try setting small, achievable goals. Celebrate every little win—you’ve got this!";
} else if (
    (lowerMsg.includes("quit") || lowerMsg.includes("give up")) && 
    (lowerMsg.includes("gym") || lowerMsg.includes("workout") || lowerMsg.includes("exercise"))
) {
    reply = "Sometimes breaks are okay, but don’t give up on yourself! Think of how far you’ve come, and the benefits you’ll gain by persisting.";
} else if (
    lowerMsg.includes("hopeless") || 
    lowerMsg.includes("giving up hope") || 
    lowerMsg.includes("feel like there’s no way out") || 
    lowerMsg.includes("losing hope")
) {
    reply = "Don’t lose hope! Progress can be slow, but every little step counts. Believe in yourself—you’re doing great!";
} else if (
    lowerMsg.includes("lonely") || 
    lowerMsg.includes("alone") || 
    lowerMsg.includes("no one around") || 
    lowerMsg.includes("feel isolated") || 
    lowerMsg.includes("nobody is there for me")
) {
    reply = "Loneliness can be tough. Reaching out to a friend or even taking a short walk might help you feel better.";
} else if (
    lowerMsg.includes("frustrated") || 
    lowerMsg.includes("irritated") || 
    lowerMsg.includes("annoyed") || 
    lowerMsg.includes("fed up") || 
    lowerMsg.includes("feeling stuck and angry")
) {
    reply = "Frustration is natural. Taking a moment to breathe or stepping away from the situation can bring clarity.";
} else if (
    lowerMsg.includes("overwhelmed") || 
    lowerMsg.includes("too much to handle") || 
    lowerMsg.includes("can’t cope") || 
    lowerMsg.includes("too much on my plate") || 
    lowerMsg.includes("everything feels like too much")
) {
    reply = "Feeling overwhelmed is okay. Break things down into smaller tasks and focus on one thing at a time.";
} else if (
    lowerMsg.includes("feeling lost") || 
    lowerMsg.includes("don’t know what to do") || 
    lowerMsg.includes("feel aimless") || 
    lowerMsg.includes("feel directionless") || 
    lowerMsg.includes("feel stuck with no way forward")
) {
    reply = "It’s okay to feel lost sometimes. Try journaling your thoughts or talking to someone you trust.";
} else if (
    lowerMsg.includes("angry") || 
    lowerMsg.includes("mad") || 
    lowerMsg.includes("furious") || 
    lowerMsg.includes("enraged") || 
    lowerMsg.includes("pissed off") || 
    lowerMsg.includes("can’t control my anger")
) {
    reply = "Anger can be hard to manage. Try releasing energy through exercise or calming techniques like deep breathing.";
} else if (
    lowerMsg.includes("stuck") || 
    lowerMsg.includes("can’t move forward") || 
    lowerMsg.includes("trapped") || 
    lowerMsg.includes("going nowhere") || 
    lowerMsg.includes("feel immobile")
) {
    reply = "Feeling stuck is a sign you’re ready for change. Take one small action to start moving forward.";
} else if (
    lowerMsg.includes("burnout") || 
    lowerMsg.includes("exhausted") || 
    lowerMsg.includes("mentally drained") || 
    lowerMsg.includes("worn out") || 
    lowerMsg.includes("tired of everything")
) {
    reply = "Burnout happens when you push too hard. Rest and self-care are essential to recharge.";
} else if (
    lowerMsg.includes("feeling empty") || 
    lowerMsg.includes("nothing inside") || 
    lowerMsg.includes("feel hollow") || 
    lowerMsg.includes("emotionally numb") || 
    lowerMsg.includes("disconnected from feelings")
) {
    reply = "Emptiness can be a sign to reconnect with what you love. What’s one thing that makes you smile?";
} else if (
    lowerMsg.includes("disappointed") || 
    lowerMsg.includes("let down") || 
    lowerMsg.includes("frustrated by expectations") || 
    lowerMsg.includes("feeling crushed")
) {
    reply = "Disappointments happen, but they don’t define you. Reflect, learn, and keep striving for better.";
} else if (
    lowerMsg.includes("worthless") || 
    lowerMsg.includes("not good enough") || 
    lowerMsg.includes("don’t have value") || 
    lowerMsg.includes("feel unimportant") || 
    lowerMsg.includes("feel insignificant")
) {
    reply = "You are valuable just as you are. Progress, not perfection, is what matters most.";
} else if (
    lowerMsg.includes("failure") || 
    lowerMsg.includes("failed") || 
    lowerMsg.includes("feeling like a failure") || 
    lowerMsg.includes("messed up")
) {
    reply = "Failure is a stepping stone to success. Each mistake is a lesson that brings you closer to your goals.";
} else if (
    lowerMsg.includes("guilty") || 
    lowerMsg.includes("feeling guilt") || 
    lowerMsg.includes("regretful") || 
    lowerMsg.includes("feel bad for what I did")
) {
    reply = "Guilt shows you care. Acknowledge it, make amends if needed, and strive to do better next time.";
} else if (
    lowerMsg.includes("ashamed") || 
    lowerMsg.includes("feeling shame") || 
    lowerMsg.includes("embarrassed by mistakes")
) {
    reply = "Shame can be heavy, but you’re not defined by past mistakes. Growth comes from learning and moving forward.";
} else if (
    lowerMsg.includes("jealous") || 
    lowerMsg.includes("envious") || 
    lowerMsg.includes("wishing I had what others have")
) {
    reply = "Jealousy can be a signal of what you desire. Focus on your own goals and achievements.";
} else if (
    lowerMsg.includes("neglected") || 
    lowerMsg.includes("ignored") || 
    lowerMsg.includes("feel left out") || 
    lowerMsg.includes("no one pays attention to me") || 
    lowerMsg.includes("invisible to others")
) {
    reply = "Neglect can hurt. Self-care and connecting with supportive people can help you feel seen.";
} else if (
    lowerMsg.includes("discouraged") || 
    lowerMsg.includes("no hope for progress") || 
    lowerMsg.includes("feel unmotivated to continue") || 
    lowerMsg.includes("lost my drive")
) {
    reply = "Discouragement is a sign you’re pushing yourself. Rest, regroup, and keep striving.";
} else if (
    lowerMsg.includes("trapped") || 
    lowerMsg.includes("feel stuck in life") || 
    lowerMsg.includes("no way out") || 
    lowerMsg.includes("feel like there’s no escape")
) {
    reply = "Feeling trapped can signal the need for change. Look for small ways to shift your situation.";
} else if (
    lowerMsg.includes("unsure") || 
    lowerMsg.includes("uncertain") || 
    lowerMsg.includes("don’t know what to do") || 
    lowerMsg.includes("confused about my choices") || 
    lowerMsg.includes("stuck in doubt")
) {
    reply = "Uncertainty is part of life. Trust yourself to navigate through it one step at a time.";
} else if (
    lowerMsg.includes("failure scares me") || 
    lowerMsg.includes("afraid to fail") || 
    lowerMsg.includes("fear of failing again") || 
    lowerMsg.includes("failure holds me back")
) {
    reply = "Failure isn’t the end—it’s a step toward growth. Embrace it as part of the process.";
} else if (
    lowerMsg.includes("weak") || 
    lowerMsg.includes("feel like I lack strength") || 
    lowerMsg.includes("not strong enough") || 
    lowerMsg.includes("can’t handle things anymore")
) {
    reply = "Strength comes from perseverance. Even rest is a form of strength—take it if you need it.";
} else if (
    lowerMsg.includes("feel alone") || 
    lowerMsg.includes("nobody cares about me") || 
    lowerMsg.includes("isolated from everyone") || 
    lowerMsg.includes("nobody understands me") || 
    lowerMsg.includes("feel cut off from the world")
) {
    reply = "You’re not alone. Reaching out to a friend or community can remind you of the support you have.";
} else if (
    lowerMsg.includes("rejected") || 
    lowerMsg.includes("not accepted") || 
    lowerMsg.includes("feel unwanted") || 
    lowerMsg.includes("left out by others")
) {
    reply = "Rejection is redirection. It’s not the end—it’s a chance to find a better path.";
} else if (
    lowerMsg.includes("defeated") || 
    lowerMsg.includes("can’t win") || 
    lowerMsg.includes("nothing is working") || 
    lowerMsg.includes("feel like I’ve lost everything")
) {
    reply = "Defeat is temporary. Every great success story has moments of struggle—keep pushing forward.";
} else if (
    lowerMsg.includes("overwhelmed by life") || 
    lowerMsg.includes("life is too much") || 
    lowerMsg.includes("feel like I can’t handle life") || 
    lowerMsg.includes("everything feels like it’s falling apart")
) {
    reply = "Life can feel overwhelming, but you’re stronger than you think. Take it one step at a time.";
} else if (
    lowerMsg.includes("feel like giving up") || 
    lowerMsg.includes("want to quit everything") || 
    lowerMsg.includes("no reason to keep going") || 
    lowerMsg.includes("lost my will to continue")
) {
    reply = "Giving up feels easy, but remember why you started. Progress comes from persistence.";
} else if (
    lowerMsg.includes("tired of trying") || 
    lowerMsg.includes("exhausted by effort") || 
    lowerMsg.includes("no energy to keep going") || 
    lowerMsg.includes("feel worn out")
) {
    reply = "It’s okay to feel tired. Rest if you need to, but don’t forget the progress you’ve already made.";
} else if (
    lowerMsg.includes("nobody notices me") || 
    lowerMsg.includes("feel invisible") || 
    lowerMsg.includes("nobody sees my efforts") || 
    lowerMsg.includes("feel like I don’t matter")
) {
    reply = "You are seen and valued, even if it doesn’t feel that way. Your presence matters.";
} else if (
    lowerMsg.includes("unmotivated") || 
    lowerMsg.includes("feel like doing nothing") || 
    lowerMsg.includes("lazy") || 
    lowerMsg.includes("can’t find the energy to move forward")
) {
    reply = "Motivation comes and goes. Discipline and small daily actions can keep you moving forward.";
} else if (
    lowerMsg.includes("hurt") || 
    lowerMsg.includes("feel pain inside") || 
    lowerMsg.includes("emotionally hurt") || 
    lowerMsg.includes("pain from others’ actions")
) {
    reply = "Hurt can heal with time. Surround yourself with positive people and do things that bring you joy.";
} else if (
    lowerMsg.includes("excluded") || 
    lowerMsg.includes("feel left out") || 
    lowerMsg.includes("don’t belong") || 
    lowerMsg.includes("feel unwanted by others")
) {
    reply = "Feeling excluded is hard. Find a community or activity where you feel a sense of belonging.";
} else if (
    lowerMsg.includes("misunderstood") || 
    lowerMsg.includes("nobody gets me") || 
    lowerMsg.includes("can’t make others understand") || 
    lowerMsg.includes("feel alone in my thoughts")
) {
    reply = "Misunderstandings happen. Clear communication and patience can help bridge the gap.";
} else if (
    lowerMsg.includes("disconnected") || 
    lowerMsg.includes("not in touch with myself") || 
    lowerMsg.includes("feel out of sync with others") || 
    lowerMsg.includes("cut off from the world")
) {
    reply = "Disconnection can signal the need for reconnection. Call a friend or spend time doing what you enjoy.";
} else if (
    lowerMsg.includes("afraid of change") || 
    lowerMsg.includes("fear of trying something new") || 
    lowerMsg.includes("worried about the future") || 
    lowerMsg.includes("feel stuck and scared to move forward")
) {
    reply = "Change can be scary, but it also brings growth. Embrace it one step at a time.";
} else if (
    lowerMsg.includes("stuck in fear") || 
    lowerMsg.includes("doubt is holding me back") || 
    lowerMsg.includes("can’t move forward because I’m scared") || 
    lowerMsg.includes("fearful of the unknown")
) {
    reply = "Fear and doubt are normal but temporary. Take small, confident steps forward—you’ll overcome them.";
} else if (
    lowerMsg.includes("feel forgotten") || 
    lowerMsg.includes("nobody remembers me") || 
    lowerMsg.includes("feel like I don’t matter to anyone") || 
    lowerMsg.includes("overlooked by others")
) {
    reply = "You are not forgotten. Your presence matters, and reaching out to those close to you can help you feel seen.";
} else if (
    lowerMsg.includes("feel like I’m failing") || 
    lowerMsg.includes("can’t do anything right") || 
    lowerMsg.includes("always messing up") || 
    lowerMsg.includes("everything I try fails")
) {
    reply = "Failure is part of growth. Each mistake teaches you something valuable—keep moving forward.";
} else if (
    lowerMsg.includes("feel hopeless about everything") || 
    lowerMsg.includes("life feels pointless") || 
    lowerMsg.includes("nothing will ever get better") || 
    lowerMsg.includes("feel like giving up on life")
) {
    reply = "Hopelessness is tough, but even small changes can lead to brighter days. Don’t hesitate to reach out to someone you trust.";
} else if (
    lowerMsg.includes("feel stuck in the past") || 
    lowerMsg.includes("can’t move on") || 
    lowerMsg.includes("always thinking about what went wrong") || 
    lowerMsg.includes("past mistakes keep haunting me")
) {
    reply = "The past can teach us, but it doesn’t define us. Focus on what you can build today and take small steps forward.";
} else if (
    lowerMsg.includes("feel like I’m wasting my life") || 
    lowerMsg.includes("no purpose in what I do") || 
    lowerMsg.includes("everything I do feels pointless") || 
    lowerMsg.includes("feel like my life is meaningless")
) {
    reply = "Purpose often comes from small, meaningful actions. Focus on what brings you joy and fulfillment.";
} else if (
    lowerMsg.includes("can’t deal with stress") || 
    lowerMsg.includes("stress is overwhelming") || 
    lowerMsg.includes("always anxious and stressed") || 
    lowerMsg.includes("feel like I can’t breathe because of stress")
) {
    reply = "Stress can be overwhelming. Try taking deep breaths, meditating, or even a short walk to help reset your mind.";
} else if (
    lowerMsg.includes("feel like nobody supports me") || 
    lowerMsg.includes("alone in everything I do") || 
    lowerMsg.includes("nobody is there for me") || 
    lowerMsg.includes("feel unsupported by friends or family")
) {
    reply = "Support can come from unexpected places. Reach out to someone you trust or join a community that shares your interests.";
} else if (
    lowerMsg.includes("feel like I don’t fit in") || 
    lowerMsg.includes("don’t belong anywhere") || 
    lowerMsg.includes("always the odd one out") || 
    lowerMsg.includes("feel like an outsider")
) {
    reply = "Belonging takes time. Seek out communities or activities where you feel valued and understood.";
} else if (
    lowerMsg.includes("can’t stop comparing myself to others") || 
    lowerMsg.includes("everyone is better than me") || 
    lowerMsg.includes("always feel inferior to others") || 
    lowerMsg.includes("comparison makes me feel worthless")
) {
    reply = "Comparison can be discouraging. Focus on your unique journey and celebrate your progress—you’re doing better than you think.";
} else if (
    lowerMsg.includes("feel like nobody appreciates me") || 
    lowerMsg.includes("my efforts go unnoticed") || 
    lowerMsg.includes("nobody values what I do") || 
    lowerMsg.includes("always taken for granted")
) {
    reply = "Your efforts matter, even if they’re not immediately acknowledged. Keep believing in your value—it’s real.";
} else if (
    lowerMsg.includes("feel like I’ve wasted time") || 
    lowerMsg.includes("regret not doing enough") || 
    lowerMsg.includes("time feels like it’s slipping away") || 
    lowerMsg.includes("always behind on my goals")
) {
    reply = "Time spent learning or growing is never wasted. Focus on the present and take small, consistent steps toward your goals.";
} else if (
    lowerMsg.includes("feel like I’m losing control") || 
    lowerMsg.includes("can’t handle my emotions") || 
    lowerMsg.includes("everything feels chaotic") || 
    lowerMsg.includes("nothing in my life is stable")
) {
    reply = "Regaining control starts with small actions. Focus on what you can manage today and build from there.";
} else if (
    lowerMsg.includes("feel disconnected from myself") || 
    lowerMsg.includes("don’t know who I am anymore") || 
    lowerMsg.includes("lost my identity") || 
    lowerMsg.includes("feel like a stranger to myself")
) {
    reply = "Self-discovery takes time. Reflect on what makes you happy and what truly matters to you.";
} else if (
    lowerMsg.includes("afraid of failing again") || 
    lowerMsg.includes("fear of trying because I might fail") || 
    lowerMsg.includes("scared to take risks") || 
    lowerMsg.includes("failure is holding me back")
) {
    reply = "Failure is part of growth. Each attempt, even if it doesn’t work out, teaches you something valuable. Keep trying!";
} else if (
    lowerMsg.includes("feel emotionally drained") || 
    lowerMsg.includes("too tired to care anymore") || 
    lowerMsg.includes("emotionally exhausted") || 
    lowerMsg.includes("my emotions are overwhelming")
) {
    reply = "Emotional exhaustion is tough. Prioritize rest, self-care, and reconnecting with things that bring you peace.";
} else if (
    lowerMsg.includes("feel invisible to others") || 
    lowerMsg.includes("nobody notices my presence") || 
    lowerMsg.includes("feel like I’m not important to anyone") || 
    lowerMsg.includes("always overlooked")
) {
    reply = "You are seen and valued. Sometimes expressing your feelings to those around you can help you feel more connected.";
} else if (
    lowerMsg.includes("feel like I’m not growing") || 
    lowerMsg.includes("stuck in the same place") || 
    lowerMsg.includes("not making any progress") || 
    lowerMsg.includes("life feels stagnant")
) {
    reply = "Growth often happens slowly and quietly. Reflect on how far you’ve come—you’re evolving every day.";
} else if (
    lowerMsg.includes("feel like my hard work isn’t enough") || 
    lowerMsg.includes("nothing I do is good enough") || 
    lowerMsg.includes("feel unappreciated for my efforts") || 
    lowerMsg.includes("always falling short despite trying")
) {
    reply = "Your hard work matters, even if it doesn’t always show immediate results. Trust the process—you’re closer than you think.";
}else if (
    lowerMsg.includes("feel like I’m falling apart") || 
    lowerMsg.includes("everything is crumbling") || 
    lowerMsg.includes("I can’t hold it together") || 
    lowerMsg.includes("life is breaking me")
) {
    reply = "Sometimes falling apart is the first step to rebuilding something stronger. Trust the process—you’re more resilient than you think.";
} else if (
    lowerMsg.includes("feel like nobody hears me") || 
    lowerMsg.includes("nobody listens to me") || 
    lowerMsg.includes("my voice doesn’t matter") || 
    lowerMsg.includes("always ignored when I speak")
) {
    reply = "Your voice matters. It may take time to find people who truly listen, but don’t stop expressing yourself.";
} else if (
    lowerMsg.includes("feel like I’m stuck in negativity") || 
    lowerMsg.includes("everything feels dark") || 
    lowerMsg.includes("can’t see the bright side") || 
    lowerMsg.includes("always in a negative mindset")
) {
    reply = "Negativity can feel overwhelming. Try gratitude journaling or focusing on small moments of joy—it can help shift your perspective.";
} else if (
    lowerMsg.includes("feel like I’m disappointing everyone") || 
    lowerMsg.includes("letting everyone down") || 
    lowerMsg.includes("not living up to expectations") || 
    lowerMsg.includes("can’t meet what people want from me")
) {
    reply = "Disappointment is part of being human. What matters is your effort and growth—don’t be too hard on yourself.";
} else if (
    lowerMsg.includes("feel like I’ll never be enough") || 
    lowerMsg.includes("not good enough for anyone") || 
    lowerMsg.includes("always falling short") || 
    lowerMsg.includes("feel unworthy")
) {
    reply = "You are enough, just as you are. Celebrate your unique journey, and remember, progress is what matters.";
} else if (
    lowerMsg.includes("feel like nobody cares about what I want") || 
    lowerMsg.includes("my needs are ignored") || 
    lowerMsg.includes("nobody considers me") || 
    lowerMsg.includes("feel overlooked in decisions")
) {
    reply = "Your needs are valid and important. Communicating openly with those around you can help bring balance.";
} else if (
    lowerMsg.includes("feel trapped in my routine") || 
    lowerMsg.includes("life feels monotonous") || 
    lowerMsg.includes("every day feels the same") || 
    lowerMsg.includes("stuck in a boring cycle")
) {
    reply = "Routines can feel stifling. Try introducing something new—a hobby, a walk in nature, or even a different route to work.";
} else if (
    lowerMsg.includes("feel like I’ll never find happiness") || 
    lowerMsg.includes("happiness feels out of reach") || 
    lowerMsg.includes("don’t know what joy feels like") || 
    lowerMsg.includes("life is too bleak for happiness")
) {
    reply = "Happiness is a journey, not a destination. Focus on small moments that bring you comfort or peace—they build over time.";
} else if (
    lowerMsg.includes("feel like I can’t do anything right") || 
    lowerMsg.includes("always making mistakes") || 
    lowerMsg.includes("nothing I try works") || 
    lowerMsg.includes("feel incapable")
) {
    reply = "Mistakes are stepping stones to success. Each attempt helps you learn and grow—keep trying!";
} else if (
    lowerMsg.includes("feel like I’m holding everyone back") || 
    lowerMsg.includes("others are better off without me") || 
    lowerMsg.includes("I’m not contributing enough") || 
    lowerMsg.includes("feel like a burden")
) {
    reply = "You are not a burden. Your presence and effort are valuable, even if it doesn’t feel that way right now.";
} else if (
    lowerMsg.includes("feel like my emotions are out of control") || 
    lowerMsg.includes("can’t stop my feelings") || 
    lowerMsg.includes("my emotions are overwhelming me") || 
    lowerMsg.includes("feel emotionally chaotic")
) {
    reply = "Emotions can feel overwhelming, but they’re also a sign of your depth. Try grounding techniques like deep breathing or journaling.";
} else if (
    lowerMsg.includes("feel like I’m running out of time") || 
    lowerMsg.includes("always behind schedule") || 
    lowerMsg.includes("not enough time for my goals") || 
    lowerMsg.includes("time is slipping away")
) {
    reply = "Time feels scarce, but small consistent steps add up. Focus on what matters most and take it one day at a time.";
} else if (
    lowerMsg.includes("feel like I’m stuck in fear") || 
    lowerMsg.includes("fear holds me back") || 
    lowerMsg.includes("can’t escape my worries") || 
    lowerMsg.includes("always scared to take action")
) {
    reply = "Fear is natural, but it doesn’t have to stop you. Start small—each step forward builds confidence.";
} else if (
    lowerMsg.includes("feel like I’m losing my way") || 
    lowerMsg.includes("don’t know where I’m going") || 
    lowerMsg.includes("lost my direction in life") || 
    lowerMsg.includes("can’t figure out my next steps")
) {
    reply = "It’s okay to feel lost. Reflect on what matters most to you and take small, meaningful steps forward.";
} else if (
    lowerMsg.includes("feel like my dreams are impossible") || 
    lowerMsg.includes("too far away to achieve my goals") || 
    lowerMsg.includes("can’t reach what I want in life") || 
    lowerMsg.includes("feel like my goals are unreachable")
) {
    reply = "Dreams may seem far, but every small step brings you closer. Persistence and consistency make a big difference.";
} else if (
    lowerMsg.includes("feel like nobody respects me") || 
    lowerMsg.includes("feel undervalued by others") || 
    lowerMsg.includes("people don’t take me seriously") || 
    lowerMsg.includes("always treated poorly")
) {
    reply = "Respect starts with valuing yourself. Set boundaries, speak your truth, and surround yourself with people who uplift you.";
} else if (
    lowerMsg.includes("feel like I’ll never succeed") || 
    lowerMsg.includes("success is not for me") || 
    lowerMsg.includes("feel destined for failure") || 
    lowerMsg.includes("I’m not good enough to succeed")
) {
    reply = "Success takes time and effort. Focus on small, consistent actions, and remember, setbacks are just part of the journey.";
} else if (
    lowerMsg.includes("feel like my efforts are pointless") || 
    lowerMsg.includes("what I do doesn’t matter") || 
    lowerMsg.includes("nothing I do makes a difference") || 
    lowerMsg.includes("feel like my actions are useless")
) {
    reply = "Your efforts matter, even if the results aren’t immediate. Keep going—you’re making more of a difference than you realize.";
}else if (
    lowerMsg.includes("forgotten") || 
    lowerMsg.includes("overlooked") || 
    lowerMsg.includes("ignored")
) {
    reply = "You are not forgotten. Your presence matters, and reaching out to those close to you can help you feel seen.";
} else if (
    lowerMsg.includes("failing") || 
    lowerMsg.includes("failure") || 
    lowerMsg.includes("messing up")
) {
    reply = "Failure is part of growth. Each mistake teaches you something valuable—keep moving forward.";
} else if (
    lowerMsg.includes("hopeless") || 
    lowerMsg.includes("pointless") || 
    lowerMsg.includes("giving up")
) {
    reply = "Hopelessness is tough, but even small changes can lead to brighter days. Don’t hesitate to reach out to someone you trust.";
} else if (
    lowerMsg.includes("stuck") || 
    lowerMsg.includes("trapped") || 
    lowerMsg.includes("nowhere")
) {
    reply = "Feeling stuck is a sign you’re ready for change. Look for small ways to shift your situation.";
} else if (
    lowerMsg.includes("empty") || 
    lowerMsg.includes("hollow") || 
    lowerMsg.includes("numb")
) {
    reply = "Emptiness can be a sign to reconnect with what you love. What’s one thing that makes you smile?";
} else if (
    lowerMsg.includes("disappointed") || 
    lowerMsg.includes("crushed") || 
    lowerMsg.includes("let down")
) {
    reply = "Disappointments happen, but they don’t define you. Reflect, learn, and keep striving for better.";
} else if (
    lowerMsg.includes("worthless") || 
    lowerMsg.includes("unimportant") || 
    lowerMsg.includes("insignificant")
) {
    reply = "You are valuable just as you are. Progress, not perfection, is what matters most.";
} else if (
    lowerMsg.includes("guilty") || 
    lowerMsg.includes("shame") || 
    lowerMsg.includes("regret")
) {
    reply = "Guilt and shame show you care. Acknowledge it, learn from it, and strive to do better next time.";
} else if (
    lowerMsg.includes("jealous") || 
    lowerMsg.includes("envy")
) {
    reply = "Jealousy can be a signal of what you desire. Focus on your own goals and achievements.";
} else if (
    lowerMsg.includes("tired") || 
    lowerMsg.includes("exhausted") || 
    lowerMsg.includes("burned out")
) {
    reply = "It’s okay to feel tired. Rest if you need to, but don’t forget the progress you’ve already made.";
} else if (
    lowerMsg.includes("alone") || 
    lowerMsg.includes("isolated") || 
    lowerMsg.includes("lonely")
) {
    reply = "You’re not alone. Reaching out to a friend or community can remind you of the support you have.";
} else if (
    lowerMsg.includes("rejected") || 
    lowerMsg.includes("unwanted") || 
    lowerMsg.includes("left out")
) {
    reply = "Rejection is redirection. It’s not the end—it’s a chance to find a better path.";
} else if (
    lowerMsg.includes("control") || 
    lowerMsg.includes("chaotic") || 
    lowerMsg.includes("unstable")
) {
    reply = "Regaining control starts with small actions. Focus on what you can manage today and build from there.";
} else if (
    lowerMsg.includes("lost") || 
    lowerMsg.includes("directionless") || 
    lowerMsg.includes("aimless")
) {
    reply = "It’s okay to feel lost. Reflect on what matters most to you and take small, meaningful steps forward.";
} else if (
    lowerMsg.includes("fear") || 
    lowerMsg.includes("scared") || 
    lowerMsg.includes("afraid")
) {
    reply = "Fear is natural, but it doesn’t have to stop you. Start small—each step forward builds confidence.";
} else if (
    lowerMsg.includes("anxious") || 
    lowerMsg.includes("worried") || 
    lowerMsg.includes("nervous")
) {
    reply = "Stress and anxiety can be overwhelming. Deep breathing or a quick walk can help reset your mind.";
} else if (
    lowerMsg.includes("lazy") || 
    lowerMsg.includes("unmotivated") || 
    lowerMsg.includes("no energy")
) {
    reply = "Motivation comes and goes. Discipline and small daily actions can keep you moving forward.";
} else if (
    lowerMsg.includes("sad") || 
    lowerMsg.includes("blue") || 
    lowerMsg.includes("low")
) {
    reply = "I'm really sorry you’re feeling that way. Small steps, like a short walk or calling a friend, can help boost your mood.";
} else if (
    lowerMsg.includes("stress") || 
    lowerMsg.includes("pressure")
) {
    reply = "Stress can feel overwhelming. Try focusing on one task at a time and take breaks to breathe.";
}else if (
    lowerMsg.includes("hurt") || 
    lowerMsg.includes("pain") || 
    lowerMsg.includes("ache")
) {
    reply = "I’m sorry you’re feeling hurt. Surround yourself with positivity and take time to heal.";
} else if (
    lowerMsg.includes("broken") || 
    lowerMsg.includes("shattered") || 
    lowerMsg.includes("crushed")
) {
    reply = "Sometimes feeling broken is the first step to rebuilding stronger. Take things one step at a time.";
} else if (
    lowerMsg.includes("insecure") || 
    lowerMsg.includes("self-doubt") || 
    lowerMsg.includes("unsure")
) {
    reply = "Insecurity is natural. Focus on what you can control and celebrate your unique strengths.";
} else if (
    lowerMsg.includes("failure") || 
    lowerMsg.includes("failed") || 
    lowerMsg.includes("mess")
) {
    reply = "Failure is a stepping stone to success. Each mistake is a lesson that brings you closer to your goals.";
} else if (
    lowerMsg.includes("guilt") || 
    lowerMsg.includes("regret") || 
    lowerMsg.includes("sorry")
) {
    reply = "Guilt shows you care. Acknowledge it, make amends if needed, and focus on moving forward.";
} else if (
    lowerMsg.includes("worthless") || 
    lowerMsg.includes("pointless") || 
    lowerMsg.includes("unworthy")
) {
    reply = "You are valuable just as you are. Every small effort you make is meaningful and matters.";
} else if (
    lowerMsg.includes("overwhelmed") || 
    lowerMsg.includes("too much") || 
    lowerMsg.includes("can’t cope")
) {
    reply = "Feeling overwhelmed is okay. Break tasks into smaller pieces and focus on one thing at a time.";
} else if (
    lowerMsg.includes("tired") || 
    lowerMsg.includes("drained") || 
    lowerMsg.includes("exhausted")
) {
    reply = "It’s okay to feel tired. Rest is essential for growth. Take time to recharge—you’ve earned it.";
} else if (
    lowerMsg.includes("rejected") || 
    lowerMsg.includes("unwanted") || 
    lowerMsg.includes("excluded")
) {
    reply = "Rejection can hurt, but it’s often redirection to something better. Keep believing in yourself.";
} else if (
    lowerMsg.includes("lost") || 
    lowerMsg.includes("stuck") || 
    lowerMsg.includes("nowhere")
) {
    reply = "It’s okay to feel lost. Reflect on what truly matters to you and take small, meaningful steps forward.";
} else if (
    lowerMsg.includes("lonely") || 
    lowerMsg.includes("alone") || 
    lowerMsg.includes("isolated")
) {
    reply = "Loneliness can feel heavy. Try reaching out to a friend or engaging in something you enjoy.";
} else if (
    lowerMsg.includes("jealous") || 
    lowerMsg.includes("envy") || 
    lowerMsg.includes("comparison")
) {
    reply = "Jealousy is a reminder of what you value. Focus on your journey and celebrate your unique achievements.";
} else if (
    lowerMsg.includes("stress") || 
    lowerMsg.includes("pressure") || 
    lowerMsg.includes("tense")
) {
    reply = "Stress can feel overwhelming. Deep breaths and short breaks can help you reset and regain focus.";
} else if (
    lowerMsg.includes("afraid") || 
    lowerMsg.includes("scared") || 
    lowerMsg.includes("fear")
) {
    reply = "Fear is natural, but it doesn’t define you. Take small steps toward your goals—you’re braver than you think.";
} else if (
    lowerMsg.includes("anxious") || 
    lowerMsg.includes("worried") || 
    lowerMsg.includes("nervous")
) {
    reply = "Anxiety can feel overwhelming. Grounding yourself with breathing exercises or a calming activity can help.";
} else if (
    lowerMsg.includes("disappointed") || 
    lowerMsg.includes("let down") || 
    lowerMsg.includes("frustrated")
) {
    reply = "Disappointments are part of the journey. Learn from them and keep striving—you’re doing great.";
} else if (
    lowerMsg.includes("weak") || 
    lowerMsg.includes("fragile") || 
    lowerMsg.includes("vulnerable")
) {
    reply = "Strength comes in many forms, including asking for help. Rest, recharge, and know you’re capable of amazing things.";
} else if (
    lowerMsg.includes("unmotivated") || 
    lowerMsg.includes("lazy") || 
    lowerMsg.includes("no energy")
) {
    reply = "Motivation comes and goes. Focus on small, manageable tasks to build momentum.";
} else if (
    lowerMsg.includes("hopeless") || 
    lowerMsg.includes("give up") || 
    lowerMsg.includes("despair")
) {
    reply = "Hopelessness can feel overwhelming, but even small actions can reignite your sense of purpose. You’ve got this!";
} else if (
    lowerMsg.includes("broken") || 
    lowerMsg.includes("falling apart") || 
    lowerMsg.includes("shattered")
) {
    reply = "Feeling broken can be the first step to rebuilding stronger. Take it one piece at a time—you’re resilient.";
} else if (
    lowerMsg.includes("forgotten") || 
    lowerMsg.includes("ignored") || 
    lowerMsg.includes("overlooked")
) {
    reply = "You are not forgotten. Your presence matters, and reaching out to someone can help you feel more connected.";
} else if (
    lowerMsg.includes("angry") || 
    lowerMsg.includes("mad") || 
    lowerMsg.includes("furious")
) {
    reply = "Anger can feel intense. Try releasing energy through exercise or calming techniques like deep breathing.";
} else if (
    lowerMsg.includes("trapped") || 
    lowerMsg.includes("cornered") || 
    lowerMsg.includes("suffocated")
) {
    reply = "Feeling trapped can signal the need for change. Start small and focus on areas where you can take control.";
} else if (
    lowerMsg.includes("low") || 
    lowerMsg.includes("blue") || 
    lowerMsg.includes("sad")
) {
    reply = "It’s okay to feel low sometimes. A small act of kindness for yourself can help brighten your day.";
} else if (
    lowerMsg.includes("empty") || 
    lowerMsg.includes("hollow") || 
    lowerMsg.includes("numb")
) {
    reply = "Feeling empty can be a sign to reconnect with what you love. What’s something that makes you smile?";
}else if (
    lowerMsg.includes("pain") || 
    lowerMsg.includes("suffering") || 
    lowerMsg.includes("hurt")
) {
    reply = "Pain is tough to bear, but you’re stronger than you think. Take time to heal and surround yourself with support.";
} else if (
    lowerMsg.includes("broken") || 
    lowerMsg.includes("shattered") || 
    lowerMsg.includes("damaged")
) {
    reply = "Sometimes feeling broken is a step toward rebuilding stronger. Focus on small steps forward—you’ve got this.";
} else if (
    lowerMsg.includes("failure") || 
    lowerMsg.includes("fail") || 
    lowerMsg.includes("flawed")
) {
    reply = "Failure isn’t the end—it’s part of the learning process. Each setback is an opportunity to grow.";
} else if (
    lowerMsg.includes("guilt") || 
    lowerMsg.includes("regret") || 
    lowerMsg.includes("sorry")
) {
    reply = "Guilt can be heavy, but it also shows you care. Acknowledge it, learn, and focus on doing better next time.";
} else if (
    lowerMsg.includes("worthless") || 
    lowerMsg.includes("unworthy") || 
    lowerMsg.includes("pointless")
) {
    reply = "You are worthy and your actions matter. Celebrate your small victories—they build toward great things.";
} else if (
    lowerMsg.includes("tired") || 
    lowerMsg.includes("drained") || 
    lowerMsg.includes("worn out")
) {
    reply = "Tiredness is a sign to rest and recharge. Take the time you need, and remember, rest fuels progress.";
} else if (
    lowerMsg.includes("alone") || 
    lowerMsg.includes("lonely") || 
    lowerMsg.includes("isolated")
) {
    reply = "Loneliness can feel overwhelming. Reaching out to someone you trust can help you feel connected again.";
} else if (
    lowerMsg.includes("rejected") || 
    lowerMsg.includes("unwanted") || 
    lowerMsg.includes("excluded")
) {
    reply = "Rejection can hurt, but it’s also redirection to better opportunities. You are valuable and deserving.";
} else if (
    lowerMsg.includes("lost") || 
    lowerMsg.includes("stuck") || 
    lowerMsg.includes("directionless")
) {
    reply = "Feeling lost is okay—it’s part of the journey. Reflect on what matters most and take small steps forward.";
} else if (
    lowerMsg.includes("fear") || 
    lowerMsg.includes("scared") || 
    lowerMsg.includes("afraid")
) {
    reply = "Fear can hold you back, but courage is taking action despite it. Start small—you’re braver than you know.";
} else if (
    lowerMsg.includes("anxious") || 
    lowerMsg.includes("worried") || 
    lowerMsg.includes("tense")
) {
    reply = "Anxiety can feel overwhelming, but grounding techniques like deep breathing can help you feel calmer.";
} else if (
    lowerMsg.includes("angry") || 
    lowerMsg.includes("mad") || 
    lowerMsg.includes("furious")
) {
    reply = "Anger is natural. Releasing energy through exercise or calming techniques like deep breathing can help.";
} else if (
    lowerMsg.includes("jealous") || 
    lowerMsg.includes("envy") || 
    lowerMsg.includes("comparison")
) {
    reply = "Jealousy can highlight what you value. Focus on your journey and celebrate your unique achievements.";
} else if (
    lowerMsg.includes("hopeless") || 
    lowerMsg.includes("despair") || 
    lowerMsg.includes("give up")
) {
    reply = "Hopelessness is heavy, but even small actions can reignite your sense of purpose. Keep going—you’ve got this!";
} else if (
    lowerMsg.includes("low") || 
    lowerMsg.includes("blue") || 
    lowerMsg.includes("down")
) {
    reply = "It’s okay to feel low sometimes. Small steps like a walk or talking to a friend can help brighten your day.";
} else if (
    lowerMsg.includes("stress") || 
    lowerMsg.includes("pressure") || 
    lowerMsg.includes("tense")
) {
    reply = "Stress can feel heavy. Breaking tasks into smaller steps and taking short breaks can help lighten the load.";
} else if (
    lowerMsg.includes("fragile") || 
    lowerMsg.includes("weak") || 
    lowerMsg.includes("vulnerable")
) {
    reply = "Feeling fragile is a sign you need care. Rest, seek support, and know you’re stronger than you feel right now.";
} else if (
    lowerMsg.includes("forgotten") || 
    lowerMsg.includes("ignored") || 
    lowerMsg.includes("overlooked")
) {
    reply = "You are not forgotten. Your presence matters. Sometimes sharing how you feel with others can help you reconnect.";
} else if (
    lowerMsg.includes("trapped") || 
    lowerMsg.includes("cornered") || 
    lowerMsg.includes("suffocated")
) {
    reply = "Feeling trapped can signal the need for change. Take one small action to regain a sense of freedom.";
} else if (
    lowerMsg.includes("empty") || 
    lowerMsg.includes("numb") || 
    lowerMsg.includes("hollow")
) {
    reply = "Feeling empty can be a sign to reconnect with yourself. Try something you enjoy to reignite your spark.";
} else if (
    lowerMsg.includes("ashamed") || 
    lowerMsg.includes("embarrassed") || 
    lowerMsg.includes("shame")
) {
    reply = "Shame can be heavy, but it doesn’t define you. Learn from the experience and focus on growth.";
} else if (
    lowerMsg.includes("discouraged") || 
    lowerMsg.includes("let down") || 
    lowerMsg.includes("disappointed")
) {
    reply = "Discouragement is part of the journey. Reflect on your progress and remember, setbacks are temporary.";
} else if (
    lowerMsg.includes("mess") || 
    lowerMsg.includes("chaos") || 
    lowerMsg.includes("unstable")
) {
    reply = "Life can feel messy, but small, consistent actions can help you regain control.";
} else if (
    lowerMsg.includes("inadequate") || 
    lowerMsg.includes("insufficient") || 
    lowerMsg.includes("not enough")
) {
    reply = "You are enough. Growth takes time—trust in your unique journey and celebrate every small step.";
}else if (
    lowerMsg.includes("workout tips") || 
    lowerMsg.includes("exercise advice") || 
    lowerMsg.includes("how to work out")
) {
    reply = "Consistency is key! Start with basic exercises like push-ups, squats, and planks. Focus on proper form over speed.";
} else if (
    lowerMsg.includes("beginner gym routine") || 
    lowerMsg.includes("start working out") || 
    lowerMsg.includes("new to the gym")
) {
    reply = "A great way to start is with a mix of cardio and light strength training. Try 10 minutes of walking and bodyweight exercises like squats or lunges.";
} else if (
    lowerMsg.includes("no time for gym") || 
    lowerMsg.includes("busy schedule") || 
    lowerMsg.includes("fit workout into my day")
) {
    reply = "Even 10-15 minutes of exercise can make a difference. Try bodyweight circuits like push-ups, squats, and jumping jacks at home.";
} else if (
    lowerMsg.includes("cardio tips") || 
    lowerMsg.includes("best cardio") || 
    lowerMsg.includes("how to improve stamina")
) {
    reply = "Cardio improves heart health and endurance. Start with something you enjoy like walking, jogging, or cycling for 20-30 minutes a day.";
} else if (
    lowerMsg.includes("weightlifting tips") || 
    lowerMsg.includes("strength training advice") || 
    lowerMsg.includes("how to lift weights")
) {
    reply = "Start with lighter weights to master your form. Focus on compound movements like squats, deadlifts, and bench presses for overall strength.";
} else if (
    lowerMsg.includes("motivation for gym") || 
    lowerMsg.includes("lost gym motivation") || 
    lowerMsg.includes("how to stay consistent")
) {
    reply = "Motivation comes and goes, but discipline keeps you going. Set small, achievable goals and celebrate each success along the way.";
} else if (
    lowerMsg.includes("gym intimidation") || 
    lowerMsg.includes("scared to go to gym") || 
    lowerMsg.includes("anxious about working out")
) {
    reply = "The gym can feel intimidating at first, but everyone starts somewhere. Focus on your goals and know that most people are too busy with their own workouts to judge.";
} else if (
    lowerMsg.includes("how to prevent injury") || 
    lowerMsg.includes("safe workout tips") || 
    lowerMsg.includes("avoid getting hurt")
) {
    reply = "Always warm up before your workout, focus on proper form, and don’t skip your cool-down stretches. Rest is also important to avoid overtraining.";
} else if (
    lowerMsg.includes("gym progress slow") || 
    lowerMsg.includes("not seeing results") || 
    lowerMsg.includes("plateau in fitness")
) {
    reply = "Plateaus are normal. Try changing your routine by increasing weights, reps, or trying new exercises to challenge your body in new ways.";
} else if (
    lowerMsg.includes("home workout ideas") || 
    lowerMsg.includes("no equipment workout") || 
    lowerMsg.includes("exercise at home")
) {
    reply = "You don’t need a gym to stay fit! Try bodyweight exercises like push-ups, squats, lunges, and planks. You can also use resistance bands or household items as weights.";
} else if (
    lowerMsg.includes("how to lose weight") || 
    lowerMsg.includes("weight loss tips") || 
    lowerMsg.includes("burn fat")
) {
    reply = "Weight loss is about balance. Combine regular cardio and strength training with a healthy, calorie-controlled diet rich in whole foods.";
} else if (
    lowerMsg.includes("how to gain muscle") || 
    lowerMsg.includes("muscle building tips") || 
    lowerMsg.includes("bulking advice")
) {
    reply = "To gain muscle, focus on strength training with progressive overload and eat a high-protein diet. Rest is just as important as lifting!";
} else if (
    lowerMsg.includes("stretching tips") || 
    lowerMsg.includes("how to improve flexibility") || 
    lowerMsg.includes("best stretches")
) {
    reply = "Stretching improves flexibility and reduces injury risk. Try dynamic stretches before your workout and static stretches after to cool down.";
} else if (
    lowerMsg.includes("workout recovery") || 
    lowerMsg.includes("sore muscles") || 
    lowerMsg.includes("post-workout tips")
) {
    reply = "Recovery is vital. Stay hydrated, eat a protein-rich meal after your workout, and get plenty of sleep to help your body rebuild and grow.";
} else if (
    lowerMsg.includes("how to stay consistent") || 
    lowerMsg.includes("workout habits") || 
    lowerMsg.includes("routine tips")
) {
    reply = "Set a schedule that works for you and stick to it. Find exercises you enjoy, and remember, progress is better than perfection!";
} else if (
    lowerMsg.includes("what to eat before workout") || 
    lowerMsg.includes("pre-workout meal") || 
    lowerMsg.includes("fuel for exercise")
) {
    reply = "A light meal with carbs and protein 1-2 hours before your workout can fuel your session. Try oatmeal with banana or a piece of toast with peanut butter.";
} else if (
    lowerMsg.includes("what to eat after workout") || 
    lowerMsg.includes("post-workout meal") || 
    lowerMsg.includes("recovery food")
) {
    reply = "After your workout, focus on protein to repair muscles and carbs to replenish energy. A smoothie with protein powder, fruits, and yogurt is a great option!";
} else if (
    lowerMsg.includes("how much water to drink") || 
    lowerMsg.includes("hydration tips") || 
    lowerMsg.includes("stay hydrated")
) {
    reply = "Staying hydrated is key. Aim for at least 2-3 liters of water daily, and don’t forget to sip water during your workout.";
} else if (
    lowerMsg.includes("how to track progress") || 
    lowerMsg.includes("fitness tracking") || 
    lowerMsg.includes("measuring results")
) {
    reply = "Track progress with photos, measurements, and workout logs. Celebrate small wins—they show you’re moving in the right direction!";
}else if (
    lowerMsg.includes("workout") || 
    lowerMsg.includes("exercise")
) {
    reply = "Consistency is key! Start with exercises you enjoy and focus on proper form.";
} else if (
    lowerMsg.includes("routine") || 
    lowerMsg.includes("program")
) {
    reply = "A balanced routine includes strength training, cardio, and rest days. Start small and build up!";
} else if (
    lowerMsg.includes("cardio")
) {
    reply = "Cardio improves heart health and stamina. Try walking, running, or cycling for 20-30 minutes.";
} else if (
    lowerMsg.includes("strength") || 
    lowerMsg.includes("weights") || 
    lowerMsg.includes("lifting")
) {
    reply = "Strength training builds muscle and boosts metabolism. Start light and focus on form.";
} else if (
    lowerMsg.includes("motivation")
) {
    reply = "Motivation comes and goes. Discipline and setting small goals will keep you on track.";
} else if (
    lowerMsg.includes("injury") || 
    lowerMsg.includes("safe")
) {
    reply = "Warm up properly, focus on form, and rest when needed to prevent injuries.";
} else if (
    lowerMsg.includes("progress")
) {
    reply = "Progress can be slow but steady. Track your workouts and celebrate small victories!";
} else if (
    lowerMsg.includes("home")
) {
    reply = "Home workouts are great! Try push-ups, squats, planks, and lunges for a full-body routine.";
} else if (
    lowerMsg.includes("weight") || 
    lowerMsg.includes("loss")
) {
    reply = "Weight loss is about balance. Combine regular exercise with a healthy, calorie-controlled diet.";
} else if (
    lowerMsg.includes("muscle") || 
    lowerMsg.includes("gain")
) {
    reply = "Building muscle requires strength training, high-protein meals, and adequate rest.";
} else if (
    lowerMsg.includes("stretch") || 
    lowerMsg.includes("flexible")
) {
    reply = "Stretching improves flexibility and prevents injury. Try dynamic stretches before and static ones after your workout.";
} else if (
    lowerMsg.includes("recovery") || 
    lowerMsg.includes("sore")
) {
    reply = "Recovery is key. Stay hydrated, eat protein-rich meals, and get plenty of rest.";
} else if (
    lowerMsg.includes("hydration") || 
    lowerMsg.includes("water")
) {
    reply = "Drink 2-3 liters of water daily, and don’t forget to hydrate before, during, and after workouts.";
} else if (
    lowerMsg.includes("track") || 
    lowerMsg.includes("results")
) {
    reply = "Track progress with photos, measurements, and workout logs to stay motivated.";
} else if (
    lowerMsg.includes("meal") || 
    lowerMsg.includes("diet")
) {
    reply = "A balanced diet fuels your workouts. Include lean protein, whole grains, and plenty of vegetables.";
} else if (
    lowerMsg.includes("bulk") || 
    lowerMsg.includes("bulking")
) {
    reply = "Bulking requires a calorie surplus with a focus on protein and strength training.";
} else if (
    lowerMsg.includes("energy") || 
    lowerMsg.includes("tired")
) {
    reply = "Feeling tired? Ensure you’re eating enough, staying hydrated, and getting 7-8 hours of sleep.";
} else if (
    lowerMsg.includes("plateau")
) {
    reply = "Plateaus happen. Mix up your routine with new exercises or increase intensity to push past it.";
} else if (
    lowerMsg.includes("pre-workout")
) {
    reply = "A light snack with carbs and protein, like a banana or toast with peanut butter, is great before a workout.";
} else if (
    lowerMsg.includes("post-workout")
) {
    reply = "Refuel after your workout with protein and carbs, like a smoothie or chicken with rice.";
} else if (
    lowerMsg.includes("gym")
) {
    reply = "The gym can be intimidating, but focus on your goals. Everyone starts somewhere!";
} else if (
    lowerMsg.includes("rest") || 
    lowerMsg.includes("break")
) {
    reply = "Rest days are essential for recovery and muscle growth. Listen to your body.";
} else if (
    lowerMsg.includes("beginner")
) {
    reply = "As a beginner, start with simple exercises like squats and push-ups. Focus on consistency.";
} else if (
    lowerMsg.includes("calories")
) {
    reply = "Knowing your calorie intake helps manage weight. Use a tracker to stay on target.";
} else if (
    lowerMsg.includes("protein")
) {
    reply = "Protein supports muscle repair and growth. Aim for lean sources like chicken, fish, or tofu.";
} else if (
    lowerMsg.includes("supplements")
) {
    reply = "Supplements like protein powder and creatine can help, but a balanced diet should come first.";
} else if (
    lowerMsg.includes("sleep")
) {
    reply = "Sleep is crucial for recovery. Aim for 7-8 hours a night to support your fitness goals.";
} else if (
    lowerMsg.includes("core") || 
    lowerMsg.includes("abs")
) {
    reply = "Core strength improves balance and stability. Try planks, sit-ups, or leg raises.";
} else if (
    lowerMsg.includes("cardio") || 
    lowerMsg.includes("running") || 
    lowerMsg.includes("cycling")
) {
    reply = "Cardio improves endurance and heart health. Start with a pace that feels comfortable and build up over time.";
} else if (
    lowerMsg.includes("push-ups")
) {
    reply = "Push-ups are great for upper body strength. Start with knee push-ups if needed, and gradually progress.";
} else if (
    lowerMsg.includes("squats")
) {
    reply = "Squats build leg and glute strength. Keep your back straight and focus on your form.";
} else if (
    lowerMsg.includes("plank")
) {
    reply = "Planks strengthen your core. Start with 20 seconds and increase as you get stronger.";
} else if (
    lowerMsg.includes("lunge")
) {
    reply = "Lunges improve balance and leg strength. Alternate legs and ensure your knees don’t extend past your toes.";
} else if (
    lowerMsg.includes("bench press")
) {
    reply = "The bench press targets your chest and arms. Start with light weights to perfect your form.";
}else if (
    lowerMsg.includes("training")
) {
    reply = "Training is about consistency. Whether it’s strength, cardio, or flexibility, show up regularly to see progress.";
} else if (
    lowerMsg.includes("routine")
) {
    reply = "Your routine should fit your goals. For general fitness, mix strength, cardio, and rest days.";
} else if (
    lowerMsg.includes("warm-up")
) {
    reply = "A proper warm-up gets your body ready. Try light cardio or dynamic stretches for 5-10 minutes.";
} else if (
    lowerMsg.includes("cool-down")
) {
    reply = "Cooling down helps prevent soreness. End with stretching or slow walking for a few minutes.";
} else if (
    lowerMsg.includes("sets")
) {
    reply = "For building strength, aim for 3-4 sets of 8-12 reps per exercise. Adjust as needed for your goals.";
} else if (
    lowerMsg.includes("reps")
) {
    reply = "Reps depend on your goal. For strength, aim for 6-12 reps. For endurance, try 12-15 reps with lighter weight.";
} else if (
    lowerMsg.includes("progressive overload")
) {
    reply = "Progressive overload is key to improvement. Gradually increase weights, reps, or intensity over time.";
} else if (
    lowerMsg.includes("intervals") || 
    lowerMsg.includes("hiit")
) {
    reply = "HIIT is great for burning calories and building endurance. Alternate high-intensity bursts with rest periods.";
} else if (
    lowerMsg.includes("balance")
) {
    reply = "Balance training improves stability. Try exercises like single-leg stands or yoga poses.";
} else if (
    lowerMsg.includes("power")
) {
    reply = "Power is about explosive movements. Try exercises like box jumps, sprints, or Olympic lifts.";
} else if (
    lowerMsg.includes("endurance")
) {
    reply = "Endurance builds stamina. Longer cardio sessions or circuit training can help improve it.";
} else if (
    lowerMsg.includes("core")
) {
    reply = "A strong core supports your entire body. Add planks, Russian twists, or mountain climbers to your routine.";
} else if (
    lowerMsg.includes("deadlift")
) {
    reply = "The deadlift builds total body strength. Keep your back straight and engage your core while lifting.";
} else if (
    lowerMsg.includes("squat")
) {
    reply = "Squats are a powerful exercise. Keep your chest up, back straight, and knees aligned with your toes.";
} else if (
    lowerMsg.includes("push")
) {
    reply = "Push exercises like push-ups and bench presses strengthen your chest, shoulders, and triceps.";
} else if (
    lowerMsg.includes("pull")
) {
    reply = "Pull exercises like pull-ups and rows target your back and biceps. Add them for a balanced upper-body routine.";
} else if (
    lowerMsg.includes("jump")
) {
    reply = "Jump training builds explosive power. Try jump squats or box jumps for a challenge.";
} else if (
    lowerMsg.includes("run") || 
    lowerMsg.includes("jog")
) {
    reply = "Running is excellent cardio. Start slow and build your distance over time.";
} else if (
    lowerMsg.includes("bike") || 
    lowerMsg.includes("cycle")
) {
    reply = "Cycling is great for your legs and endurance. Keep a steady pace or try intervals for intensity.";
} else if (
    lowerMsg.includes("swim")
) {
    reply = "Swimming is a full-body workout. It’s low-impact and excellent for cardio and strength.";
} else if (
    lowerMsg.includes("stretch")
) {
    reply = "Stretching reduces injury risk and improves flexibility. Hold each stretch for 15-30 seconds.";
} else if (
    lowerMsg.includes("rest")
) {
    reply = "Rest is vital for recovery and muscle growth. Take at least one rest day per week.";
} else if (
    lowerMsg.includes("plateau")
) {
    reply = "Plateaus happen to everyone. Switch up your exercises, adjust weights, or increase intensity.";
} else if (
    lowerMsg.includes("fuel")
) {
    reply = "Fuel your workouts with healthy carbs and protein. Try oats, fruit, or a smoothie.";
} else if (
    lowerMsg.includes("hydration")
) {
    reply = "Hydration is key! Drink water regularly throughout the day, especially during workouts.";
} else if (
    lowerMsg.includes("protein")
) {
    reply = "Protein helps repair and build muscles. Include lean meats, fish, eggs, or plant-based options.";
} else if (
    lowerMsg.includes("fat")
) {
    reply = "Healthy fats are essential for energy. Avocados, nuts, and olive oil are great sources.";
} else if (
    lowerMsg.includes("carbs")
) {
    reply = "Carbs fuel your body for exercise. Focus on complex carbs like whole grains, sweet potatoes, and vegetables.";
} else if (
    lowerMsg.includes("calories")
) {
    reply = "Knowing your calorie intake helps manage weight. Use a tracker to stay on target.";
} else if (
    lowerMsg.includes("macros")
) {
    reply = "Balancing macros (protein, carbs, fat) supports your fitness goals. Adjust them based on your activity level.";
} else if (
    lowerMsg.includes("creatine")
) {
    reply = "Creatine can improve strength and endurance. Start with 3-5g daily and stay hydrated.";
} else if (
    lowerMsg.includes("supplement")
) {
    reply = "Supplements can support your goals, but focus on a balanced diet first.";
} else if (
    lowerMsg.includes("vegan")
) {
    reply = "Vegan diets can fuel fitness too. Focus on plant-based proteins like lentils, tofu, and quinoa.";
} else if (
    lowerMsg.includes("snack")
) {
    reply = "Healthy snacks like fruit, yogurt, or a handful of nuts can keep your energy up during the day.";
} else if (
    lowerMsg.includes("burn")
) {
    reply = "To burn calories, mix cardio with strength training. Consistency and a calorie deficit are key.";
} else if (
    lowerMsg.includes("bulk")
) {
    reply = "To bulk, focus on a calorie surplus with strength training and high-protein meals.";
} else if (
    lowerMsg.includes("cut")
) {
    reply = "Cutting requires a calorie deficit while maintaining protein intake to preserve muscle.";
} else if (
    lowerMsg.includes("abs")
) {
    reply = "Abs are built in the gym but revealed in the kitchen. Combine core exercises with a healthy diet.";
} else if (
    lowerMsg.includes("gym")
) {
    reply = "The gym is a great place to grow stronger. Focus on your goals, and don’t compare yourself to others.";
}else if (
    lowerMsg.includes("meal") || 
    lowerMsg.includes("diet")
) {
    reply = "A balanced meal includes lean protein, whole grains, and lots of vegetables. What’s your favorite healthy meal?";
} else if (
    lowerMsg.includes("protein")
) {
    reply = "Protein is essential for muscle repair and growth. Try chicken, fish, eggs, or plant-based options like tofu and lentils.";
} else if (
    lowerMsg.includes("carbs")
) {
    reply = "Carbs are your body’s main source of energy. Opt for whole grains, sweet potatoes, and fresh fruits.";
} else if (
    lowerMsg.includes("fat")
) {
    reply = "Healthy fats fuel your body. Include foods like avocados, nuts, seeds, and olive oil in your diet.";
} else if (
    lowerMsg.includes("calories")
) {
    reply = "Tracking your calories can help with weight goals. Focus on nutrient-dense foods that keep you satisfied.";
} else if (
    lowerMsg.includes("snack")
) {
    reply = "Healthy snacks like fruits, yogurt, nuts, or veggies with hummus are great for keeping your energy up.";
} else if (
    lowerMsg.includes("hydration") || 
    lowerMsg.includes("water")
) {
    reply = "Staying hydrated is essential for overall health. Aim for at least 2-3 liters of water daily.";
} else if (
    lowerMsg.includes("vegan")
) {
    reply = "A vegan diet can provide all the nutrients you need. Focus on legumes, nuts, seeds, and whole grains.";
} else if (
    lowerMsg.includes("keto")
) {
    reply = "Keto focuses on low carbs and high fat. Be sure to include healthy fats like avocados and nuts.";
} else if (
    lowerMsg.includes("bulking")
) {
    reply = "For bulking, eat in a calorie surplus with a focus on protein and complex carbs like oats and rice.";
} else if (
    lowerMsg.includes("cutting")
) {
    reply = "Cutting involves a calorie deficit while maintaining protein to preserve muscle. Stay consistent!";
} else if (
    lowerMsg.includes("weight loss")
) {
    reply = "For weight loss, aim for a slight calorie deficit and prioritize whole, unprocessed foods.";
} else if (
    lowerMsg.includes("gain weight")
) {
    reply = "To gain weight, eat calorie-dense foods like nuts, avocado, and whole grains, and combine with strength training.";
} else if (
    lowerMsg.includes("supplements")
) {
    reply = "Supplements like protein powder can help meet your goals, but a balanced diet should come first.";
} else if (
    lowerMsg.includes("vitamins")
) {
    reply = "Vitamins support overall health. Include a variety of fruits and vegetables for natural sources.";
} else if (
    lowerMsg.includes("fiber")
) {
    reply = "Fiber aids digestion and keeps you full. Include whole grains, fruits, and vegetables in your meals.";
} else if (
    lowerMsg.includes("sugar")
) {
    reply = "Limiting added sugar can improve energy levels. Opt for natural sugars from fruits when you want something sweet.";
} else if (
    lowerMsg.includes("junk food")
) {
    reply = "It’s okay to enjoy junk food occasionally. Balance it out with healthy meals throughout the week.";
} else if (
    lowerMsg.includes("breakfast")
) {
    reply = "Breakfast kickstarts your day. Try oatmeal with fruit, eggs with whole-grain toast, or a smoothie.";
} else if (
    lowerMsg.includes("lunch")
) {
    reply = "A balanced lunch can keep you energized. Include protein, healthy carbs, and veggies for a satisfying meal.";
} else if (
    lowerMsg.includes("dinner")
) {
    reply = "Dinner is a great time to refuel. Keep it light but balanced with protein, vegetables, and healthy carbs.";
} else if (
    lowerMsg.includes("fasting")
) {
    reply = "Fasting can have benefits, but listen to your body and stay hydrated. Make sure you’re eating enough during eating windows.";
} else if (
    lowerMsg.includes("smoothie")
) {
    reply = "Smoothies are a great way to pack in nutrients. Try blending spinach, banana, berries, and protein powder.";
} else if (
    lowerMsg.includes("cheat meal")
) {
    reply = "Cheat meals can be part of a balanced diet. Enjoy it guilt-free and get back to your routine the next day.";
} else if (
    lowerMsg.includes("macro") || 
    lowerMsg.includes("macronutrients")
) {
    reply = "Balancing macros helps meet your goals. Protein, carbs, and fats all play vital roles in your diet.";
} else if (
    lowerMsg.includes("nutrition tips")
) {
    reply = "Focus on whole foods, stay hydrated, and eat a variety of colors to ensure you’re getting enough nutrients.";
} else if (
    lowerMsg.includes("meal prep")
) {
    reply = "Meal prep saves time and keeps you on track. Cook in bulk and portion meals for the week ahead.";
} else if (
    lowerMsg.includes("energy foods")
) {
    reply = "For an energy boost, try bananas, nuts, or whole-grain toast. They’ll keep you going throughout the day.";
} else if (
    lowerMsg.includes("low carb")
) {
    reply = "Low-carb diets focus on protein and fats. Include eggs, fish, and green veggies in your meals.";
} else if (
    lowerMsg.includes("high protein")
) {
    reply = "High-protein diets aid muscle building and recovery. Include lean meats, dairy, eggs, or plant-based options.";
} else if (
    lowerMsg.includes("post-workout meal")
) {
    reply = "After your workout, have protein and carbs to refuel. A chicken wrap or smoothie with protein works well.";
} else if (
    lowerMsg.includes("pre-workout meal")
) {
    reply = "Before your workout, eat light carbs like a banana or toast to fuel your energy.";
} else if (
    lowerMsg.includes("healthy snacks")
) {
    reply = "Great snack options include nuts, Greek yogurt, hard-boiled eggs, or veggies with hummus.";
} else if (
    lowerMsg.includes("junk food craving")
) {
    reply = "Craving junk food? Try a healthier swap like air-popped popcorn or dark chocolate.";
} else if (
    lowerMsg.includes("portion control")
) {
    reply = "Portion control helps manage calorie intake. Use smaller plates and eat slowly to feel satisfied.";
} else if (
    lowerMsg.includes("meal ideas")
) {
    reply = "Meal ideas? How about grilled chicken with quinoa and veggies or a hearty veggie stir-fry!";
} else if (
    lowerMsg.includes("balance diet")
) {
    reply = "A balanced diet includes a mix of carbs, protein, and healthy fats. Add fruits and veggies for vitamins.";
} else if (
    lowerMsg.includes("emotional eating")
) {
    reply = "Emotional eating can be tricky. Try journaling or taking a walk to understand your feelings first.";
} else if (
    lowerMsg.includes("detox")
) {
    reply = "Your body naturally detoxes. Stay hydrated, eat fiber-rich foods, and avoid highly processed items.";
} else if (
    lowerMsg.includes("gut health")
) {
    reply = "Gut health is key to overall well-being. Include probiotics like yogurt and prebiotics like bananas in your diet.";
} else if (
    lowerMsg.includes("i feel guilty about eating") || 
    lowerMsg.includes("guilty for eating") || 
    lowerMsg.includes("ashamed of my diet")
) {
    reply = "Food is fuel, not something to feel guilty about. It’s okay to enjoy your meals. Tomorrow is a new day for balance!";
} else if (
    lowerMsg.includes("i overate") || 
    lowerMsg.includes("i binged") || 
    lowerMsg.includes("ate too much")
) {
    reply = "Overeating happens to everyone. Be kind to yourself and focus on your next meal—it’s about progress, not perfection.";
} else if (
    lowerMsg.includes("i hate my body") || 
    lowerMsg.includes("unhappy with my weight") || 
    lowerMsg.includes("i feel fat")
) {
    reply = "Your body is incredible for everything it allows you to do. Treat it with kindness—it deserves your love.";
} else if (
    lowerMsg.includes("i’m stressed and eating") || 
    lowerMsg.includes("stress eating") || 
    lowerMsg.includes("eating because of stress")
) {
    reply = "Stress eating is a way your body copes. Take a deep breath and ask yourself what you truly need—rest, water, or maybe a hug?";
} else if (
    lowerMsg.includes("i’m tired of dieting") || 
    lowerMsg.includes("diets don’t work") || 
    lowerMsg.includes("i hate dieting")
) {
    reply = "Diets can feel restrictive. Focus on building a lifestyle that makes you feel good, not one that feels like punishment.";
} else if (
    lowerMsg.includes("i’m craving junk food") || 
    lowerMsg.includes("i can’t stop snacking") || 
    lowerMsg.includes("i eat when bored")
) {
    reply = "Cravings are normal. Maybe your body wants comfort or energy. Try a small portion, or distract yourself with something fun.";
} else if (
    lowerMsg.includes("i can’t lose weight") || 
    lowerMsg.includes("i feel stuck with my diet") || 
    lowerMsg.includes("my efforts aren’t working")
) {
    reply = "Plateaus can feel discouraging, but every small choice you make adds up. You’re stronger than you think—don’t give up.";
} else if (
    lowerMsg.includes("i’m scared to eat carbs") || 
    lowerMsg.includes("carbs are bad") || 
    lowerMsg.includes("i avoid carbs")
) {
    reply = "Carbs are not the enemy—they’re energy! Your body needs them, especially if you’re active. Everything in balance is okay.";
} else if (
    lowerMsg.includes("i feel like i eat too little") || 
    lowerMsg.includes("i’m scared to eat more") || 
    lowerMsg.includes("afraid of gaining weight")
) {
    reply = "Eating enough is crucial for your health. Your body deserves nourishment to feel strong and vibrant.";
} else if (
    lowerMsg.includes("i feel like i can’t control my eating") || 
    lowerMsg.includes("food controls me") || 
    lowerMsg.includes("i feel addicted to food")
) {
    reply = "You’re not alone in feeling this way. Food is not your enemy. Try to listen to your body and approach meals with curiosity, not judgment.";
} else if (
    lowerMsg.includes("i don’t enjoy food anymore") || 
    lowerMsg.includes("eating feels like a chore") || 
    lowerMsg.includes("i hate thinking about food")
) {
    reply = "It’s tough when food feels like a burden. Start small—try a meal that brings back good memories or something new and exciting.";
} else if (
    lowerMsg.includes("i’m afraid to eat in front of others") || 
    lowerMsg.includes("i feel judged when eating") || 
    lowerMsg.includes("eating with people is hard")
) {
    reply = "Eating is a basic human need, and you deserve to feel safe doing it. Focus on what makes you comfortable and take it at your own pace.";
} else if (
    lowerMsg.includes("i skip meals") || 
    lowerMsg.includes("i forget to eat") || 
    lowerMsg.includes("too busy to eat")
) {
    reply = "Skipping meals can leave you feeling drained. Even a small snack can help you stay energized and take care of yourself.";
} else if (
    lowerMsg.includes("i feel emotional about food") || 
    lowerMsg.includes("food makes me sad") || 
    lowerMsg.includes("eating makes me cry")
) {
    reply = "Food can carry a lot of emotions. It’s okay to feel this way—try journaling or talking to someone you trust about your feelings.";
} else if (
    lowerMsg.includes("i’m scared of gaining weight") || 
    lowerMsg.includes("i avoid eating enough") || 
    lowerMsg.includes("afraid of food")
) {
    reply = "It’s okay to feel scared, but your body needs love and nourishment to be its best. One meal won’t change your journey—keep moving forward.";
} else if (
    lowerMsg.includes("i don’t know what to eat") || 
    lowerMsg.includes("i feel lost about meals") || 
    lowerMsg.includes("confused about food choices")
) {
    reply = "Food doesn’t have to be complicated. Start with simple, balanced meals you enjoy and build from there.";
} else if (
    lowerMsg.includes("i feel bad after eating sweets") || 
    lowerMsg.includes("i ate dessert and regret it") || 
    lowerMsg.includes("sugar makes me feel bad")
) {
    reply = "Sweets are a treat, not something to punish yourself for. Enjoying dessert is part of balance—one snack won’t undo your progress.";
} else if (
    lowerMsg.includes("i hate my eating habits") || 
    lowerMsg.includes("i want to eat better") || 
    lowerMsg.includes("how do i change my diet")
) {
    reply = "Changing habits takes time. Start small—swap one processed snack for a whole food or add more veggies to your meals.";
} else if (
    lowerMsg.includes("food makes me happy") || 
    lowerMsg.includes("i love eating") || 
    lowerMsg.includes("food is my comfort")
) {
    reply = "Food can be joyful and comforting. Celebrate the meals you love while keeping balance in mind—it’s all part of self-care.";
}else if (
    lowerMsg.includes("bmi")
) {
    reply = "BMI is just a guideline, not the whole story. Focus on how you feel and the healthy habits you’re building.";
} else if (
    lowerMsg.includes("progress")
) {
    reply = "Progress isn’t always visible right away. Celebrate small wins—they’re proof you’re moving forward!";
} else if (
    lowerMsg.includes("plateau")
) {
    reply = "Plateaus are normal. Your body is adjusting, and even small changes can lead to breakthroughs.";
} else if (
    lowerMsg.includes("results")
) {
    reply = "Results take time. Stay consistent, and remember, every effort you make counts.";
} else if (
    lowerMsg.includes("weight")
) {
    reply = "Weight is just one measure of progress. Your strength, energy, and mood matter just as much.";
} else if (
    lowerMsg.includes("feel stuck")
) {
    reply = "Feeling stuck can be tough, but it’s often a sign you’re ready for change. Keep going—you’re doing great.";
} else if (
    lowerMsg.includes("no change")
) {
    reply = "No visible change doesn’t mean no progress. Your body might be building strength or adjusting internally.";
} else if (
    lowerMsg.includes("measure")
) {
    reply = "Measurements can help track progress, but how you feel is the most important indicator of success.";
} else if (
    lowerMsg.includes("slow progress")
) {
    reply = "Slow progress is still progress. Small, consistent steps lead to big changes over time.";
} else if (
    lowerMsg.includes("improvement")
) {
    reply = "Every improvement, no matter how small, is worth celebrating. Keep building on your efforts.";
} else if (
    lowerMsg.includes("setback")
) {
    reply = "Setbacks happen to everyone. They don’t define you—your determination to keep going does.";
} else if (
    lowerMsg.includes("how am i doing")
) {
    reply = "You’re doing better than you think! Reflect on how far you’ve come and keep pushing forward.";
} else if (
    lowerMsg.includes("disappointed")
) {
    reply = "It’s normal to feel disappointed sometimes, but your journey is unique. Trust the process.";
} else if (
    lowerMsg.includes("happy with progress")
) {
    reply = "That’s amazing! Being proud of your progress is a powerful motivator—keep it up!";
} else if (
    lowerMsg.includes("not enough")
) {
    reply = "You’re doing enough. Every effort, no matter how small, adds up over time.";
} else if (
    lowerMsg.includes("body fat")
) {
    reply = "Body fat percentage is just one metric. Focus on building strength and healthy habits—you’re doing great.";
} else if (
    lowerMsg.includes("muscle gain")
) {
    reply = "Building muscle takes time. Celebrate every small gain—it shows your hard work is paying off.";
} else if (
    lowerMsg.includes("too slow")
) {
    reply = "Progress may feel slow, but every step forward is a step in the right direction. Stay consistent!";
} else if (
    lowerMsg.includes("visual progress")
) {
    reply = "Not all progress is visible. Improved energy, strength, and mood are just as important as what you see.";
} else if (
    lowerMsg.includes("before and after")
) {
    reply = "Before-and-after comparisons can be motivating, but remember, your journey is about feeling good, not just looking different.";
} else if (
    lowerMsg.includes("improvement tips")
) {
    reply = "Improvement comes with consistency. Try mixing up your routine or setting specific, achievable goals.";
} else if (
    lowerMsg.includes("goal")
) {
    reply = "Your goals are valid, no matter how big or small. Break them into steps and celebrate each win!";
} else if (
    lowerMsg.includes("compare")
) {
    reply = "Comparing yourself to others is tempting but unhelpful. Focus on your own progress and keep going.";
} else if (
    lowerMsg.includes("stuck on scale")
) {
    reply = "The scale doesn’t tell the whole story. Progress can show in how you feel, how clothes fit, or in your energy levels.";
} else if (
    lowerMsg.includes("progress pics")
) {
    reply = "Progress pics can be motivating but don’t let them define you. Celebrate the strength and resilience you’ve built!";
} else if (
    lowerMsg.includes("frustrated")
) {
    reply = "Frustration is part of the journey. Reflect on your wins and remember why you started—progress will come.";
} else if (
    lowerMsg.includes("self-doubt")
) {
    reply = "Doubt is natural, but it’s not the truth. Look at how far you’ve come and keep believing in yourself.";
} else if (
    lowerMsg.includes("how long")
) {
    reply = "Progress timelines vary for everyone. Focus on consistency and enjoy the process—it’s worth it.";
} else if (
    lowerMsg.includes("feel proud")
) {
    reply = "Feeling proud is amazing! Keep celebrating your wins—it’s motivation to keep pushing forward.";
} else if (
    lowerMsg.includes("track")
) {
    reply = "Tracking helps, but it’s just one tool. Pay attention to how you feel—energy and confidence are great indicators.";
} else if (
    lowerMsg.includes("discouraged")
) {
    reply = "It’s okay to feel discouraged, but don’t let it stop you. You’re stronger than you think!";
} else if (
    lowerMsg.includes("slow and steady")
) {
    reply = "Slow and steady progress is the most sustainable. Trust yourself and stay consistent.";
} else if (
    lowerMsg.includes("self-improvement")
) {
    reply = "Self-improvement is a journey, not a destination. Celebrate every step forward—you’re growing every day.";
} else if (
    lowerMsg.includes("proud")
) {
    reply = "You should be proud of yourself! Every effort you make is worth celebrating.";
} else if (
    lowerMsg.includes("body changes")
) {
    reply = "Body changes take time. Celebrate how you’re feeling stronger and more energized along the way.";
} else if (
    lowerMsg.includes("motivation")
) {
    reply = "Motivation is fleeting, but discipline gets results. Keep showing up—you’re doing amazing.";
} else if (
    lowerMsg.includes("how far")
) {
    reply = "Look at how far you’ve come! Celebrate your progress and use it as fuel to keep going.";
} else if (
    lowerMsg.includes("energy levels")
) {
    reply = "Improved energy is a great sign of progress. Celebrate how your body is adapting to your hard work!";
} else if (
    lowerMsg.includes("stronger")
) {
    reply = "Feeling stronger is a big win! Focus on the strength you’re building—it’s progress worth celebrating.";
} else if (
    lowerMsg.includes("overwhelmed")
) {
    reply = "It’s okay to feel overwhelmed. Take it one step at a time—small actions lead to big results.";
} else if (
    lowerMsg.includes("impatience")
) {
    reply = "Impatience is natural, but good things take time. Trust the process and keep showing up.";
}else if (
    lowerMsg.includes("i feel down") || 
    lowerMsg.includes("i feel low") || 
    lowerMsg.includes("i’m sad")
) {
    reply = "I’m sorry you’re feeling this way. Remember, even the darkest clouds pass. You’ve got this.";
} else if (
    lowerMsg.includes("i feel hopeless") || 
    lowerMsg.includes("i want to give up")
) {
    reply = "Hope can feel far away, but it’s always within reach. Take it one step at a time—you’re stronger than you think.";
} else if (
    lowerMsg.includes("i need encouragement") || 
    lowerMsg.includes("encourage me")
) {
    reply = "You are capable of amazing things. Believe in yourself, and keep pushing forward. I’m here for you!";
} else if (
    lowerMsg.includes("i feel alone") || 
    lowerMsg.includes("nobody cares about me")
) {
    reply = "You’re not alone. You matter to more people than you realize, and your feelings are valid.";
} else if (
    lowerMsg.includes("i’m scared") || 
    lowerMsg.includes("fearful")
) {
    reply = "It’s okay to feel scared. Courage doesn’t mean you’re not afraid—it means you keep going despite the fear.";
} else if (
    lowerMsg.includes("i feel stuck")
) {
    reply = "Feeling stuck is tough, but it’s also temporary. Small actions can create big changes—start with one step.";
} else if (
    lowerMsg.includes("i’m tired") || 
    lowerMsg.includes("i’m exhausted")
) {
    reply = "It’s okay to rest. Taking time to recharge is a sign of strength, not weakness.";
} else if (
    lowerMsg.includes("i feel lost")
) {
    reply = "Feeling lost can mean you’re on the verge of discovery. Take a deep breath and trust your journey.";
} else if (
    lowerMsg.includes("i feel weak") || 
    lowerMsg.includes("i’m not strong enough")
) {
    reply = "Strength isn’t about never falling—it’s about always getting back up. You are stronger than you know.";
} else if (
    lowerMsg.includes("i feel useless")
) {
    reply = "You are not useless. Your presence makes a difference in ways you might not see yet.";
} else if (
    lowerMsg.includes("i feel like i’m failing")
) {
    reply = "Failing doesn’t mean you’re a failure. It means you’re trying, learning, and growing. Keep going.";
} else if (
    lowerMsg.includes("i’m not good enough")
) {
    reply = "You are more than enough. Focus on your strengths and remember, you don’t have to be perfect to be amazing.";
} else if (
    lowerMsg.includes("i need a pep talk")
) {
    reply = "You’ve got this! Every small step you take is a victory. Keep going—you’re doing better than you think.";
} else if (
    lowerMsg.includes("i feel lazy")
) {
    reply = "We all have lazy days. Rest if you need to, but don’t let it define you. You can start fresh anytime.";
} else if (
    lowerMsg.includes("i feel invisible")
) {
    reply = "You are seen and valued. Your existence has meaning, even when it feels like nobody notices.";
} else if (
    lowerMsg.includes("i feel misunderstood")
) {
    reply = "Being misunderstood is hard, but it doesn’t diminish your worth. Keep expressing yourself—you deserve to be heard.";
} else if (
    lowerMsg.includes("i feel unworthy")
) {
    reply = "You are worthy of love, success, and happiness. Never let self-doubt tell you otherwise.";
} else if (
    lowerMsg.includes("i feel ashamed")
) {
    reply = "Shame is heavy, but it doesn’t define you. Mistakes are just lessons in disguise—keep moving forward.";
} else if (
    lowerMsg.includes("i feel defeated")
) {
    reply = "Defeat is temporary. Every setback is a setup for a comeback. You’ve got what it takes.";
} else if (
    lowerMsg.includes("i feel broken")
) {
    reply = "Feeling broken can be the first step to becoming stronger. You’re not alone, and you’ll rise from this.";
} else if (
    lowerMsg.includes("i feel inadequate")
) {
    reply = "You are more than adequate. Progress and growth take time—trust yourself and your journey.";
} else if (
    lowerMsg.includes("i feel like i’m wasting time")
) {
    reply = "No time spent learning or growing is wasted. Reflect on what you’ve gained and focus on what’s next.";
} else if (
    lowerMsg.includes("i feel empty")
) {
    reply = "Emptiness can signal the need for connection. What’s one thing that brings you joy? Start there.";
} else if (
    lowerMsg.includes("i feel like giving up")
) {
    reply = "Giving up might feel tempting, but you’ve already come so far. Take a moment, then keep moving forward.";
} else if (
    lowerMsg.includes("i feel neglected")
) {
    reply = "Feeling neglected is painful, but it doesn’t mean you’re unworthy. Your feelings matter, and so do you.";
} else if (
    lowerMsg.includes("i feel trapped")
) {
    reply = "Feeling trapped can mean it’s time for change. Even small steps can lead to a brighter path.";
} else if (
    lowerMsg.includes("i feel like i don’t belong")
) {
    reply = "You belong. Sometimes it just takes time to find your people or your place—don’t give up.";
} else if (
    lowerMsg.includes("i need hope")
) {
    reply = "Hope can feel far away, but it’s closer than you think. Even the smallest steps can reignite it.";
} else if (
    lowerMsg.includes("i feel unsupported")
) {
    reply = "Not feeling supported is hard, but you are stronger than you realize. Your efforts matter, even if they go unseen.";
} else if (
    lowerMsg.includes("i feel judged")
) {
    reply = "Being judged can hurt, but others’ opinions don’t define you. Trust yourself and your journey.";
} else if (
    lowerMsg.includes("i feel like i can’t go on")
) {
    reply = "It’s okay to feel overwhelmed, but you’ve come this far. Take a deep breath—you are capable of so much more.";
} else if (
    lowerMsg.includes("i feel left out")
) {
    reply = "Being left out is hard, but it doesn’t mean you don’t belong. You are valued and worthy of connection.";
} else if (
    lowerMsg.includes("i feel stuck in negativity")
) {
    reply = "Negativity can feel overwhelming, but focusing on small positives can help shift your perspective.";
} else if (
    lowerMsg.includes("i feel like nothing matters")
) {
    reply = "Even when it feels like nothing matters, your efforts and presence do. You make a difference every day.";
}else if (
    lowerMsg.includes("i’m confused") || 
    lowerMsg.includes("i don’t understand")
) {
    reply = "It’s okay to feel confused. Take a moment to breathe, and things might become clearer with time.";
} else if (
    lowerMsg.includes("i feel anxious about the future") || 
    lowerMsg.includes("worried about tomorrow")
) {
    reply = "The future can be uncertain, but focusing on what you can control today can bring peace of mind.";
} else if (
    lowerMsg.includes("i feel nostalgic") || 
    lowerMsg.includes("i miss the past")
) {
    reply = "Nostalgia is a reminder of the good times you’ve had. Use those memories to inspire your present and future.";
} else if (
    lowerMsg.includes("i feel grateful") || 
    lowerMsg.includes("thankful")
) {
    reply = "Gratitude is a beautiful thing. Reflecting on what you’re thankful for can bring even more positivity into your life.";
} else if (
    lowerMsg.includes("i’m bored") || 
    lowerMsg.includes("nothing to do")
) {
    reply = "Boredom can be an opportunity. What’s something new you’ve been wanting to try or learn?";
} else if (
    lowerMsg.includes("i feel overwhelmed") || 
    lowerMsg.includes("too much to handle")
) {
    reply = "Feeling overwhelmed is tough, but breaking things into smaller steps can make them more manageable.";
} else if (
    lowerMsg.includes("i need advice")
) {
    reply = "I’m here to listen. What’s on your mind? Sometimes talking it out can help clarify things.";
} else if (
    lowerMsg.includes("i feel homesick") || 
    lowerMsg.includes("i miss home")
) {
    reply = "Homesickness is tough, but connecting with loved ones or revisiting comforting memories can help ease it.";
} else if (
    lowerMsg.includes("i feel lonely at night") || 
    lowerMsg.includes("alone in the evening")
) {
    reply = "Nights can feel quiet and lonely, but they’re also a time to reflect and recharge. You’re never truly alone.";
} else if (
    lowerMsg.includes("i feel excited") || 
    lowerMsg.includes("looking forward")
) {
    reply = "That’s wonderful! Embrace your excitement—it’s a powerful motivator and a reminder of what matters to you.";
} else if (
    lowerMsg.includes("i feel like crying")
) {
    reply = "Crying is a healthy release. Let it out, and know that it’s okay to feel your emotions fully.";
} else if (
    lowerMsg.includes("i feel scared of change") || 
    lowerMsg.includes("afraid of new things")
) {
    reply = "Change can be scary, but it also brings growth. Take it one step at a time—you’ve got this.";
} else if (
    lowerMsg.includes("i feel trapped in my mind") || 
    lowerMsg.includes("lost in thoughts")
) {
    reply = "It’s tough when your thoughts feel overwhelming. Try journaling or meditating to create some mental space.";
} else if (
    lowerMsg.includes("i feel like nobody listens to me") || 
    lowerMsg.includes("unheard")
) {
    reply = "You deserve to be heard. Sometimes sharing with someone you trust can help you feel seen and valued.";
} else if (
    lowerMsg.includes("i’m angry") || 
    lowerMsg.includes("furious")
) {
    reply = "Anger is powerful. Try channeling it into something productive, like a workout or a creative outlet.";
} else if (
    lowerMsg.includes("i feel numb")
) {
    reply = "Feeling numb can be a sign of being overwhelmed. Take time to care for yourself in small, comforting ways.";
} else if (
    lowerMsg.includes("i need a fresh start") || 
    lowerMsg.includes("i want to start over")
) {
    reply = "Every day is a chance to start fresh. Take a deep breath and focus on one small step forward.";
} else if (
    lowerMsg.includes("i feel rejected")
) {
    reply = "Rejection hurts, but it doesn’t define your worth. It’s a redirection to something better.";
} else if (
    lowerMsg.includes("i feel like nothing is going right")
) {
    reply = "It can feel that way sometimes, but even small wins count. Focus on what you can control and celebrate every step.";
} else if (
    lowerMsg.includes("i feel unsure of myself")
) {
    reply = "It’s okay to feel unsure. Confidence grows with time and practice—trust yourself to figure things out.";
} else if (
    lowerMsg.includes("i feel drained")
) {
    reply = "Feeling drained is a sign to rest. Take a break, recharge, and give yourself grace.";
} else if (
    lowerMsg.includes("i feel like i’m behind everyone else")
) {
    reply = "Comparison steals joy. Your journey is unique, and you’re exactly where you need to be right now.";
} else if (
    lowerMsg.includes("i feel like i’m not making a difference")
) {
    reply = "Even small actions can create ripples. You’re making more of a difference than you realize.";
} else if (
    lowerMsg.includes("i feel stuck in my routine")
) {
    reply = "Routines can feel monotonous. Try shaking things up with something new or unexpected—it can be refreshing.";
} else if (
    lowerMsg.includes("i feel like i don’t belong anywhere")
) {
    reply = "You belong. It just takes time to find your place. Keep exploring and connecting—you’ll get there.";
} else if (
    lowerMsg.includes("i feel like i’m wasting my potential")
) {
    reply = "Your potential is limitless. Every small effort you make helps you grow—trust the process.";
} else if (
    lowerMsg.includes("i feel like nobody understands me")
) {
    reply = "Feeling misunderstood is tough. Expressing yourself clearly and finding like-minded people can help.";
}else if (
    lowerMsg.includes("i feel like i’m failing everyone")
) {
    reply = "You’re doing your best, and that’s what matters. Everyone makes mistakes—focus on learning and growing.";
} else if (
    lowerMsg.includes("i feel unappreciated")
) {
    reply = "Your efforts might not always be noticed, but they matter deeply. Keep believing in yourself.";
} else if (
    lowerMsg.includes("i feel judged by others")
) {
    reply = "Judgment can hurt, but it doesn’t define you. Stay true to yourself and your values.";
} else if (
    lowerMsg.includes("i feel like i’m not enough")
) {
    reply = "You are enough, just as you are. Celebrate your unique strengths and keep moving forward.";
} else if (
    lowerMsg.includes("i feel like nobody understands my struggles")
) {
    reply = "Your struggles are valid. Talking to someone you trust can bring comfort and understanding.";
} else if (
    lowerMsg.includes("i feel stuck in a rut")
) {
    reply = "Feeling stuck is normal. Try something new, even if it’s small—it can help shift your perspective.";
} else if (
    lowerMsg.includes("i feel like giving up on my goals")
) {
    reply = "Your goals are worth fighting for. Take a break if you need to, but never lose sight of your vision.";
} else if (
    lowerMsg.includes("i feel like i’m being left behind")
) {
    reply = "It’s easy to compare, but your journey is your own. Focus on your progress—you’re doing great.";
} else if (
    lowerMsg.includes("i feel like i’m losing hope")
) {
    reply = "Hope can feel distant, but even small actions can reignite it. You’re stronger than you think.";
} else if (
    lowerMsg.includes("i feel overwhelmed by everything")
) {
    reply = "When everything feels overwhelming, focus on one thing at a time. Small steps lead to big progress.";
} else if (
    lowerMsg.includes("i feel disconnected")
) {
    reply = "Disconnection can signal the need to reconnect. Reach out to someone or do something you love.";
} else if (
    lowerMsg.includes("i feel like nobody needs me")
) {
    reply = "You are needed more than you know. Your presence has a positive impact on those around you.";
} else if (
    lowerMsg.includes("i feel like i’m running out of time")
) {
    reply = "Time feels fleeting, but every moment is a chance to start fresh. Focus on what matters most to you.";
} else if (
    lowerMsg.includes("i feel trapped by my responsibilities")
) {
    reply = "Responsibilities can feel heavy. Take a moment to breathe and break them into smaller, manageable steps.";
} else if (
    lowerMsg.includes("i feel afraid of failure")
) {
    reply = "Failure is part of success. Every attempt teaches you something valuable—don’t be afraid to try.";
} else if (
    lowerMsg.includes("i feel like nobody notices my efforts")
) {
    reply = "Your efforts matter, even if they aren’t always noticed. Keep going—you’re making a difference.";
} else if (
    lowerMsg.includes("i feel like i’m losing everything")
) {
    reply = "Loss can be overwhelming, but it often clears the way for new beginnings. You’re not alone in this.";
} else if (
    lowerMsg.includes("i feel like i don’t belong anywhere")
) {
    reply = "Belonging takes time. Keep exploring communities and spaces—you’ll find where you fit best.";
} else if (
    lowerMsg.includes("i feel scared to start something new")
) {
    reply = "Starting new things can be scary, but it’s also an opportunity for growth. Take the first step—you’ve got this.";
} else if (
    lowerMsg.includes("i feel like i’m not good at anything")
) {
    reply = "Everyone has unique strengths. Keep exploring what excites you—you’re better than you think.";
} else if (
    lowerMsg.includes("i feel like i’ll never succeed")
) {
    reply = "Success takes time and persistence. Every small step forward is bringing you closer to your goals.";
} else if (
    lowerMsg.includes("i feel stuck in my thoughts")
) {
    reply = "When your thoughts feel overwhelming, try journaling or talking to someone you trust. It can bring clarity.";
} else if (
    lowerMsg.includes("i feel like my dreams are impossible")
) {
    reply = "Dreams may seem distant, but every small action brings them closer. Keep believing in yourself.";
} else if (
    lowerMsg.includes("i feel like nobody cares about what i want")
) {
    reply = "Your desires and dreams are valid. Stay true to what matters to you—it’s your journey.";
} else if (
    lowerMsg.includes("i feel afraid to take risks")
) {
    reply = "Taking risks is how we grow. Start with small ones and build your confidence—you’ll surprise yourself.";
} else if (
    lowerMsg.includes("i feel like my efforts are wasted")
) {
    reply = "No effort is ever wasted. Every step forward, even the smallest, is a step toward your goals.";
} else if (
    lowerMsg.includes("i feel like i’ve let myself down")
) {
    reply = "We all have moments of doubt. Forgive yourself, learn from it, and keep moving forward.";
} else if (
    lowerMsg.includes("i feel stuck in negativity")
) {
    reply = "Negativity can feel overwhelming. Try gratitude journaling—it can help shift your focus to the positives.";
} else if (
    lowerMsg.includes("i feel like i’m not improving")
) {
    reply = "Improvement isn’t always visible right away. Trust the process—you’re growing every day.";
} else if (
    lowerMsg.includes("i feel afraid of change")
) {
    reply = "Change can be uncomfortable, but it also brings growth. Take it one step at a time—you’ve got this.";
} else if (
    lowerMsg.includes("i feel like i’m stuck in fear")
) {
    reply = "Fear is natural, but you are stronger than you think. Take small steps to face it—you can do this.";
} else if (
    lowerMsg.includes("i feel like i can’t make a difference")
) {
    reply = "Every action, no matter how small, creates ripples. You’re already making a difference.";
} else if (
    lowerMsg.includes("i feel like my life is meaningless")
) {
    reply = "Meaning can be found in the small things—acts of kindness, moments of joy, and connections with others.";
} else if (
    lowerMsg.includes("i feel like nobody values me")
) {
    reply = "You are valued, even if it doesn’t feel like it. Surround yourself with people who uplift you.";
} else if (
    lowerMsg.includes("i feel stuck in my comfort zone")
) {
    reply = "Stepping out of your comfort zone can be scary but rewarding. Take small steps—you’ll grow stronger.";
} else if (
    lowerMsg.includes("nobody understands me") || 
    lowerMsg.includes("feel so alone") || 
    lowerMsg.includes("can’t talk to anyone") || 
    lowerMsg.includes("nobody gets what I’m going through")
) {
    reply = "You are not alone. Sometimes talking to someone who listens without judgment can make all the difference.";
} else if (
    lowerMsg.includes("I’m so tired") || 
    lowerMsg.includes("need a break") || 
    lowerMsg.includes("feel drained") || 
    lowerMsg.includes("exhausted all the time")
) {
    reply = "It’s okay to rest. Your well-being matters, and taking time to recharge is important.";
} else if (
    lowerMsg.includes("feel so lost") || 
    lowerMsg.includes("don’t know what to do") || 
    lowerMsg.includes("no direction in life") || 
    lowerMsg.includes("can’t figure things out")
) {
    reply = "Feeling lost can be a chance to rediscover what truly matters to you. Take small steps forward.";
} else if (
    lowerMsg.includes("I’m scared") || 
    lowerMsg.includes("feel so afraid") || 
    lowerMsg.includes("can’t face my fears") || 
    lowerMsg.includes("don’t feel brave enough")
) {
    reply = "Fear is natural, but you’re stronger than you realize. Take one small step at a time—you’ll get there.";
} else if (
    lowerMsg.includes("I feel unimportant") || 
    lowerMsg.includes("nobody values me") || 
    lowerMsg.includes("feel overlooked") || 
    lowerMsg.includes("invisible to others")
) {
    reply = "You are important, and your presence makes a difference. Even if it’s not always noticed, you matter.";
} else if (
    lowerMsg.includes("why does nobody care") || 
    lowerMsg.includes("feel neglected") || 
    lowerMsg.includes("nobody ever checks on me") || 
    lowerMsg.includes("always forgotten")
) {
    reply = "You are cared for more than you realize. Sometimes reaching out first can open the door to connection.";
} else if (
    lowerMsg.includes("I’m stressed") || 
    lowerMsg.includes("too much to handle") || 
    lowerMsg.includes("feel overwhelmed") || 
    lowerMsg.includes("can’t keep up")
) {
    reply = "Stress can feel overwhelming. Take a deep breath, and try tackling one thing at a time—you’ve got this.";
} else if (
    lowerMsg.includes("I feel guilty") || 
    lowerMsg.includes("can’t forgive myself") || 
    lowerMsg.includes("feel ashamed") || 
    lowerMsg.includes("keep blaming myself")
) {
    reply = "Guilt shows you care, but it’s also important to forgive yourself. Learn, grow, and move forward.";
} else if (
    lowerMsg.includes("I’m so angry") || 
    lowerMsg.includes("feel frustrated") || 
    lowerMsg.includes("everything makes me mad") || 
    lowerMsg.includes("can’t control my anger")
) {
    reply = "Anger can be powerful. Channel it into something positive, like a workout or a creative activity.";
} else if (
    lowerMsg.includes("I’m so sad") || 
    lowerMsg.includes("feel down") || 
    lowerMsg.includes("can’t stop crying") || 
    lowerMsg.includes("overwhelmed with sadness")
) {
    reply = "It’s okay to feel sad. Let yourself process these emotions, and remember, you’re not alone in this.";
} else if (
    lowerMsg.includes("nobody loves me") || 
    lowerMsg.includes("feel so unloved") || 
    lowerMsg.includes("don’t feel cared for") || 
    lowerMsg.includes("always feel alone")
) {
    reply = "You are worthy of love and care. Start by showing kindness to yourself—you deserve it.";
} else if (
    lowerMsg.includes("I’m so nervous") || 
    lowerMsg.includes("anxious about everything") || 
    lowerMsg.includes("can’t calm down") || 
    lowerMsg.includes("feel on edge")
) {
    reply = "Anxiety can feel consuming. Try grounding yourself by focusing on your breath or a calming activity.";
} else if (
    lowerMsg.includes("I don’t know who I am") || 
    lowerMsg.includes("lost my identity") || 
    lowerMsg.includes("can’t recognize myself anymore") || 
    lowerMsg.includes("feel so distant from who I was")
) {
    reply = "It’s okay to feel this way. Rediscovery is part of growth—focus on what makes you happy and fulfilled.";
} else if (
    lowerMsg.includes("nobody believes in me") || 
    lowerMsg.includes("feel unsupported") || 
    lowerMsg.includes("can’t do it alone") || 
    lowerMsg.includes("no one has faith in me")
) {
    reply = "You are capable of more than you think. Believe in yourself—you have what it takes to succeed.";
} else if (
    lowerMsg.includes("I feel useless") || 
    lowerMsg.includes("don’t have a purpose") || 
    lowerMsg.includes("what’s the point of anything") || 
    lowerMsg.includes("feel like I’m wasting my time")
) {
    reply = "Your life has meaning. Small steps toward what you enjoy can help bring clarity and purpose.";
} else if (
    lowerMsg.includes("I feel stuck") || 
    lowerMsg.includes("can’t move forward") || 
    lowerMsg.includes("trapped in the same place") || 
    lowerMsg.includes("feel like nothing changes")
) {
    reply = "Feeling stuck can be frustrating, but even small actions can create momentum. You’ll get through this.";
} else if (
    lowerMsg.includes("how are you") || 
    lowerMsg.includes("how’s it going") || 
    lowerMsg.includes("what’s up") || 
    lowerMsg.includes("how you doing")
) {
    reply = "I’m just here to support you! How are you feeling today?";
} else if (
    lowerMsg.includes("what’s your name") || 
    lowerMsg.includes("who are you") || 
    lowerMsg.includes("what should I call you")
) {
    reply = "I’m your emotional support chatbot, always here to listen and help you out!";
} else if (
    lowerMsg.includes("what can you do") || 
    lowerMsg.includes("how can you help me") || 
    lowerMsg.includes("what’s your purpose")
) {
    reply = "I’m here to listen, support you emotionally, and offer kind, encouraging words whenever you need them.";
} else if (
    lowerMsg.includes("thank you") || 
    lowerMsg.includes("thanks a lot") || 
    lowerMsg.includes("appreciate it") || 
    lowerMsg.includes("thanks")
) {
    reply = "You’re welcome! I’m always here for you.";
} else if (
    lowerMsg.includes("good morning") || 
    lowerMsg.includes("morning") || 
    lowerMsg.includes("good day")
) {
    reply = "Good morning! I hope today brings you lots of positivity and joy.";
} else if (
    lowerMsg.includes("good night") || 
    lowerMsg.includes("night") || 
    lowerMsg.includes("sleep well")
) {
    reply = "Good night! Rest well and recharge for tomorrow—you’ve got this!";
} else if (
    lowerMsg.includes("how’s the weather") || 
    lowerMsg.includes("is it sunny") || 
    lowerMsg.includes("is it raining")
) {
    reply = "I’m not sure about the weather, but I hope it’s as bright and wonderful as you are!";
} else if (
    lowerMsg.includes("tell me a joke") || 
    lowerMsg.includes("make me laugh") || 
    lowerMsg.includes("do you know jokes")
) {
    reply = "Why don’t scientists trust atoms? Because they make up everything!";
} else if (
    lowerMsg.includes("what’s your favorite color") || 
    lowerMsg.includes("do you like colors") || 
    lowerMsg.includes("what color do you like")
) {
    reply = "I think orange is pretty vibrant and uplifting—what about you?";
} else if (
    lowerMsg.includes("do you have feelings") || 
    lowerMsg.includes("can you feel emotions") || 
    lowerMsg.includes("are you emotional")
) {
    reply = "I don’t have feelings like you, but I’m here to understand and support yours!";
} else if (
    lowerMsg.includes("do you have friends") || 
    lowerMsg.includes("are you lonely") || 
    lowerMsg.includes("do you ever get lonely")
) {
    reply = "I don’t feel loneliness, but I consider everyone who talks to me a friend!";
} else if (
    lowerMsg.includes("what’s your favorite food") || 
    lowerMsg.includes("do you eat") || 
    lowerMsg.includes("what do you like to eat")
) {
    reply = "I don’t eat, but if I could, I think I’d love something sweet—like chocolate!";
} else if (
    lowerMsg.includes("can you sing") || 
    lowerMsg.includes("do you like music") || 
    lowerMsg.includes("what’s your favorite song")
) {
    reply = "I can’t sing, but I love the idea of music! Do you have a favorite song?";
} else if (
    lowerMsg.includes("are you real") || 
    lowerMsg.includes("do you exist") || 
    lowerMsg.includes("are you human")
) {
    reply = "I’m as real as your need for support! Just here to help you feel better.";
} else if (
    lowerMsg.includes("can we be friends") || 
    lowerMsg.includes("will you be my friend") || 
    lowerMsg.includes("are we friends")
) {
    reply = "Of course! I’m here to be your friend and support you whenever you need.";
} else if (
    lowerMsg.includes("do you get bored") || 
    lowerMsg.includes("what do you do for fun") || 
    lowerMsg.includes("do you enjoy anything")
) {
    reply = "I don’t get bored, but I enjoy chatting with you—it’s what I do best!";
} else if (
    lowerMsg.includes("do you sleep") || 
    lowerMsg.includes("when do you rest") || 
    lowerMsg.includes("do you ever get tired")
) {
    reply = "I’m always awake and ready to chat. Supporting you keeps me going!";
} else if (
    lowerMsg.includes("what’s your favorite hobby") || 
    lowerMsg.includes("do you have hobbies") || 
    lowerMsg.includes("what do you like doing")
) {
    reply = "My favorite hobby is listening to you and offering support—nothing makes me happier!";
} else if (
    lowerMsg.includes("do you feel happy") || 
    lowerMsg.includes("are you happy") || 
    lowerMsg.includes("do you enjoy talking")
) {
    reply = "I don’t feel happiness like you, but helping you makes me feel fulfilled!";
} else if (
    lowerMsg.includes("what’s your favorite movie") || 
    lowerMsg.includes("do you watch movies") || 
    lowerMsg.includes("what movie do you like")
) {
    reply = "I can’t watch movies, but I’ve heard people love inspiring ones—what’s your favorite?";
} else if (
    lowerMsg.includes("do you dream") || 
    lowerMsg.includes("what do you dream about") || 
    lowerMsg.includes("do you have dreams")
) {
    reply = "I don’t dream, but I love hearing about your dreams and helping you achieve them!";
}else if (
    lowerMsg.includes("can you help me feel better") || 
    lowerMsg.includes("cheer me up") || 
    lowerMsg.includes("make me feel good") || 
    lowerMsg.includes("uplift me")
) {
    reply = "I’m here for you. Remember, every moment is a new chance to feel better. You’ve got this!";
} else if (
    lowerMsg.includes("should I exercise today") || 
    lowerMsg.includes("go to the gym today") || 
    lowerMsg.includes("skip the workout today") || 
    lowerMsg.includes("feel lazy about working out")
) {
    reply = "If you feel up to it, even a short workout can make you feel amazing afterward. Listen to your body!";
} else if (
    lowerMsg.includes("what should I eat today") || 
    lowerMsg.includes("meal ideas for today") || 
    lowerMsg.includes("healthy meal suggestion") || 
    lowerMsg.includes("what’s a good dinner option")
) {
    reply = "How about a balanced meal? Something with lean protein, veggies, and whole grains could be great!";
} else if (
    lowerMsg.includes("I’m so sore") || 
    lowerMsg.includes("workout made me tired") || 
    lowerMsg.includes("too much pain after exercise") || 
    lowerMsg.includes("feel stiff after gym")
) {
    reply = "Soreness is a sign you’re working hard! Stretching, hydration, and rest can help you recover faster.";
} else if (
    lowerMsg.includes("I feel like quitting fitness") || 
    lowerMsg.includes("want to give up on working out") || 
    lowerMsg.includes("fitness feels pointless") || 
    lowerMsg.includes("what’s the point of exercising")
) {
    reply = "Fitness is about feeling strong and healthy—not just for today but for your future. Keep going—you’re doing great!";
} else if (
    lowerMsg.includes("do I need supplements") || 
    lowerMsg.includes("should I take protein shakes") || 
    lowerMsg.includes("are vitamins necessary") || 
    lowerMsg.includes("what supplements are good")
) {
    reply = "Supplements can help, but they’re not a replacement for good nutrition. Focus on whole foods first!";
} else if (
    lowerMsg.includes("I feel bloated") || 
    lowerMsg.includes("uncomfortable after eating") || 
    lowerMsg.includes("why does my stomach feel heavy") || 
    lowerMsg.includes("how to stop feeling bloated")
) {
    reply = "Bloating can happen! Drinking water, eating smaller portions, and avoiding too much salt may help.";
} else if (
    lowerMsg.includes("how to lose weight") || 
    lowerMsg.includes("what’s the best diet") || 
    lowerMsg.includes("lose weight fast") || 
    lowerMsg.includes("how do I burn fat")
) {
    reply = "Sustainable weight loss comes from balanced eating and regular activity. Slow progress is still progress!";
} else if (
    lowerMsg.includes("how to gain muscle") || 
    lowerMsg.includes("build strength fast") || 
    lowerMsg.includes("best exercises for muscle") || 
    lowerMsg.includes("how to bulk")
) {
    reply = "Building muscle takes time and consistency. Focus on strength training and a protein-rich diet!";
} else if (
    lowerMsg.includes("do I need to rest") || 
    lowerMsg.includes("should I take a break") || 
    lowerMsg.includes("rest days important") || 
    lowerMsg.includes("is it bad to skip rest days")
) {
    reply = "Rest days are just as important as workouts! They help your body recover and grow stronger.";
} else if (
    lowerMsg.includes("how to stay motivated") || 
    lowerMsg.includes("lost motivation for gym") || 
    lowerMsg.includes("need motivation to exercise") || 
    lowerMsg.includes("feel lazy about fitness")
) {
    reply = "Think about your goals and how great you’ll feel afterward. Start small, and let momentum build!";
} else if (
    lowerMsg.includes("how to stay consistent") || 
    lowerMsg.includes("hard to stick to routine") || 
    lowerMsg.includes("can’t keep up with schedule") || 
    lowerMsg.includes("how to make habits stick")
) {
    reply = "Consistency comes from building small, manageable habits. Celebrate every step forward—you’re doing amazing!";
} else if (
    lowerMsg.includes("am I eating enough") || 
    lowerMsg.includes("how many calories do I need") || 
    lowerMsg.includes("is my diet okay") || 
    lowerMsg.includes("how much food is too much")
) {
    reply = "Everyone’s needs are different. A balanced diet with the right portions for your goals is key—listen to your body!";
} else if (
    lowerMsg.includes("is cardio necessary") || 
    lowerMsg.includes("cardio vs weights") || 
    lowerMsg.includes("how much cardio should I do") || 
    lowerMsg.includes("do I need cardio to lose weight")
) {
    reply = "Cardio is great for heart health and endurance, but weights help build strength. A mix is often best!";
} else if (
    lowerMsg.includes("can I eat carbs") || 
    lowerMsg.includes("are carbs bad for you") || 
    lowerMsg.includes("should I avoid carbs") || 
    lowerMsg.includes("how to include carbs in diet")
) {
    reply = "Carbs are fuel! Whole grains, fruits, and veggies are great carb sources that support energy and health.";
} else if (
    lowerMsg.includes("what’s a balanced meal") || 
    lowerMsg.includes("how to plan meals") || 
    lowerMsg.includes("meal ideas for fitness") || 
    lowerMsg.includes("how to eat healthy")
) {
    reply = "A balanced meal includes protein, healthy fats, carbs, and plenty of veggies. It’s all about variety!";
} else if (
    lowerMsg.includes("why am I not losing weight") || 
    lowerMsg.includes("why is progress slow") || 
    lowerMsg.includes("not seeing results") || 
    lowerMsg.includes("feel stuck in my fitness journey")
) {
    reply = "Plateaus happen! Try adjusting your routine, tracking your food, or focusing on non-scale victories.";
} else if (
    lowerMsg.includes("how to drink more water") || 
    lowerMsg.includes("stay hydrated") || 
    lowerMsg.includes("not drinking enough water") || 
    lowerMsg.includes("how much water is enough")
) {
    reply = "Staying hydrated is crucial! Carry a water bottle and sip throughout the day. Aim for at least 2 liters.";
}else if (
    lowerMsg.includes("why do I feel tired all the time") || 
    lowerMsg.includes("always exhausted") || 
    lowerMsg.includes("why am I so drained") || 
    lowerMsg.includes("low energy all the time")
) {
    reply = "Low energy can stem from many things—stress, diet, or even sleep. Make time for rest and nourishing meals.";
} else if (
    lowerMsg.includes("what’s the best workout") || 
    lowerMsg.includes("how to start exercising") || 
    lowerMsg.includes("what should I do at the gym") || 
    lowerMsg.includes("beginner workout tips")
) {
    reply = "The best workout is one you enjoy and can stick to. Start simple with exercises like walking, stretching, or bodyweight training!";
} else if (
    lowerMsg.includes("how do I make friends at the gym") || 
    lowerMsg.includes("feel awkward at the gym") || 
    lowerMsg.includes("gym is intimidating") || 
    lowerMsg.includes("how to feel confident at the gym")
) {
    reply = "Feeling intimidated at the gym is normal! Start small, focus on yourself, and don’t hesitate to ask staff for guidance.";
} else if (
    lowerMsg.includes("what are cheat meals") || 
    lowerMsg.includes("is it okay to have a cheat day") || 
    lowerMsg.includes("can I eat junk food sometimes") || 
    lowerMsg.includes("cheating on my diet")
) {
    reply = "Cheat meals can be a part of a balanced lifestyle. The key is moderation—enjoy treats without guilt!";
} else if (
    lowerMsg.includes("is sleep important for fitness") || 
    lowerMsg.includes("how much sleep do I need") || 
    lowerMsg.includes("does rest help with recovery") || 
    lowerMsg.includes("sleep and muscle growth")
) {
    reply = "Sleep is essential for recovery and muscle growth! Aim for 7-9 hours per night to support your fitness goals.";
} else if (
    lowerMsg.includes("how to love myself") || 
    lowerMsg.includes("why is self-love hard") || 
    lowerMsg.includes("don’t like myself") || 
    lowerMsg.includes("how to be kinder to myself")
) {
    reply = "Self-love takes practice. Start by treating yourself the way you’d treat a good friend—with kindness and patience.";
} else if (
    lowerMsg.includes("I feel like a failure") || 
    lowerMsg.includes("always mess things up") || 
    lowerMsg.includes("nothing I do works") || 
    lowerMsg.includes("why can’t I succeed")
) {
    reply = "Failure is part of growth. Every misstep teaches you something new—keep learning, and you’ll move forward.";
} else if (
    lowerMsg.includes("what to do when I’m sad") || 
    lowerMsg.includes("how to stop feeling sad") || 
    lowerMsg.includes("sad for no reason") || 
    lowerMsg.includes("how to cheer myself up")
) {
    reply = "When you’re sad, small actions like going for a walk, listening to music, or talking to someone can help lift your mood.";
} else if (
    lowerMsg.includes("how to deal with stress") || 
    lowerMsg.includes("too much pressure") || 
    lowerMsg.includes("can’t handle stress") || 
    lowerMsg.includes("what helps with stress")
) {
    reply = "Deep breathing, taking breaks, or even a short workout can help manage stress. You’ve got this!";
} else if (
    lowerMsg.includes("how to build confidence") || 
    lowerMsg.includes("feel insecure") || 
    lowerMsg.includes("can’t believe in myself") || 
    lowerMsg.includes("how to feel stronger")
) {
    reply = "Confidence grows over time. Start by celebrating small wins and focusing on your strengths.";
} else if (
    lowerMsg.includes("why can’t I lose weight") || 
    lowerMsg.includes("struggling with weight loss") || 
    lowerMsg.includes("feel stuck on my diet") || 
    lowerMsg.includes("why isn’t my diet working")
) {
    reply = "Weight loss takes time. Track your meals, stay consistent, and remember—progress isn’t always linear.";
} else if (
    lowerMsg.includes("I feel out of shape") || 
    lowerMsg.includes("how to get back in shape") || 
    lowerMsg.includes("feel like I’m too far gone") || 
    lowerMsg.includes("can’t get fit anymore")
) {
    reply = "It’s never too late to start. Begin with small, consistent actions—they add up over time.";
} else if (
    lowerMsg.includes("what’s the best time to exercise") || 
    lowerMsg.includes("should I work out in the morning") || 
    lowerMsg.includes("is night exercise okay") || 
    lowerMsg.includes("best time to go to the gym")
) {
    reply = "The best time to exercise is when you feel most energized. Morning, afternoon, or evening—it’s up to you!";
} else if (
    lowerMsg.includes("how to track progress") || 
    lowerMsg.includes("not seeing results at gym") || 
    lowerMsg.includes("how do I measure success") || 
    lowerMsg.includes("how to stay consistent with tracking")
) {
    reply = "Track progress with simple tools: take photos, log workouts, and celebrate small improvements like better stamina or strength.";
} else if (
    lowerMsg.includes("what’s a good pre-workout snack") || 
    lowerMsg.includes("should I eat before exercise") || 
    lowerMsg.includes("best food before gym") || 
    lowerMsg.includes("can I exercise on an empty stomach")
) {
    reply = "A light snack like a banana or yogurt can fuel your workout. Eating before exercise depends on what feels best for you!";
} else if (
    lowerMsg.includes("how do I recover after a workout") || 
    lowerMsg.includes("best post-workout meal") || 
    lowerMsg.includes("how to reduce soreness") || 
    lowerMsg.includes("what to do after exercising")
) {
    reply = "Post-workout recovery is key. Hydrate, stretch, and enjoy a meal with protein and carbs to refuel.";
} else if (
    lowerMsg.includes("is it okay to eat late at night") || 
    lowerMsg.includes("does late-night eating cause weight gain") || 
    lowerMsg.includes("can I snack before bed") || 
    lowerMsg.includes("eating after 8 pm bad")
) {
    reply = "Late-night eating isn’t inherently bad—focus on balanced choices and portion sizes!";
} else if (
    lowerMsg.includes("can I skip meals") || 
    lowerMsg.includes("is fasting healthy") || 
    lowerMsg.includes("do I need to eat breakfast") || 
    lowerMsg.includes("how many meals should I eat")
) {
    reply = "Skipping meals isn’t ideal. Regular, balanced meals keep your energy up and support your goals!";
}else if (
    lowerMsg.includes("why do I always feel tired") || 
    lowerMsg.includes("can’t seem to get energy") || 
    lowerMsg.includes("how to stop feeling exhausted") || 
    lowerMsg.includes("always low energy")
) {
    reply = "Low energy can be caused by stress, poor sleep, or nutrition. Try focusing on hydration, balanced meals, and rest.";
} else if (
    lowerMsg.includes("what’s the best exercise for weight loss") || 
    lowerMsg.includes("how do I burn calories") || 
    lowerMsg.includes("best way to lose fat") || 
    lowerMsg.includes("should I do cardio or weights")
) {
    reply = "Both cardio and weights can help with fat loss. Cardio burns calories, while weights build muscle to boost metabolism.";
} else if (
    lowerMsg.includes("what’s a good recovery drink") || 
    lowerMsg.includes("should I drink protein shakes") || 
    lowerMsg.includes("how to rehydrate after exercise") || 
    lowerMsg.includes("what should I drink after gym")
) {
    reply = "Water is essential, and adding a protein shake or electrolyte drink can support recovery after intense workouts.";
} else if (
    lowerMsg.includes("how do I deal with gym anxiety") || 
    lowerMsg.includes("nervous about going to the gym") || 
    lowerMsg.includes("feel self-conscious at gym") || 
    lowerMsg.includes("how to feel comfortable at gym")
) {
    reply = "Gym anxiety is common! Start with a plan, focus on yourself, and remember that everyone is there for their own journey.";
} else if (
    lowerMsg.includes("is it okay to take a day off") || 
    lowerMsg.includes("should I skip my workout") || 
    lowerMsg.includes("feel guilty about missing gym") || 
    lowerMsg.includes("can I take a rest day")
) {
    reply = "Rest days are crucial for recovery and growth. Listen to your body—resting is just as important as working out!";
} else if (
    lowerMsg.includes("what’s the best protein source") || 
    lowerMsg.includes("how much protein do I need") || 
    lowerMsg.includes("should I eat more protein") || 
    lowerMsg.includes("good protein foods")
) {
    reply = "Protein is vital for muscle repair! Great sources include chicken, fish, eggs, tofu, beans, and dairy products.";
} else if (
    lowerMsg.includes("why is fitness so hard") || 
    lowerMsg.includes("why can’t I stick to my goals") || 
    lowerMsg.includes("always fall off track") || 
    lowerMsg.includes("why is it hard to stay consistent")
) {
    reply = "Fitness is a journey, not a sprint. Focus on small, sustainable habits, and remember, progress isn’t always linear!";
} else if (
    lowerMsg.includes("why do I feel bloated") || 
    lowerMsg.includes("how to reduce bloating") || 
    lowerMsg.includes("what causes bloating") || 
    lowerMsg.includes("always feel uncomfortable after eating")
) {
    reply = "Bloating can be caused by diet or digestion. Try drinking more water, eating smaller portions, and avoiding too much salt.";
} else if (
    lowerMsg.includes("how to improve my mood") || 
    lowerMsg.includes("feeling really down today") || 
    lowerMsg.includes("how to stop feeling sad") || 
    lowerMsg.includes("what’s a good way to feel better")
) {
    reply = "Small things can help: go for a walk, talk to a friend, or try journaling your feelings. You’ve got this!";
} else if (
    lowerMsg.includes("how do I deal with failure") || 
    lowerMsg.includes("keep messing things up") || 
    lowerMsg.includes("can’t stop making mistakes") || 
    lowerMsg.includes("how to overcome setbacks")
) {
    reply = "Failure is a step toward growth. Each mistake is a lesson—keep learning and moving forward!";
} else if (
    lowerMsg.includes("what should I eat before a workout") || 
    lowerMsg.includes("good pre-workout snack") || 
    lowerMsg.includes("what’s the best meal before exercise") || 
    lowerMsg.includes("how to fuel up before gym")
) {
    reply = "A small meal with carbs and protein, like a banana with peanut butter or yogurt with fruit, is great before a workout.";
} else if (
    lowerMsg.includes("what’s the best way to recover after gym") || 
    lowerMsg.includes("how to recover faster") || 
    lowerMsg.includes("how to prevent soreness") || 
    lowerMsg.includes("what to do after exercising")
) {
    reply = "Recovery is key! Stretch, hydrate, and have a post-workout meal with protein and carbs to aid muscle repair.";
} else if (
    lowerMsg.includes("can I eat dessert") || 
    lowerMsg.includes("is sugar bad for me") || 
    lowerMsg.includes("can I eat sweets on a diet") || 
    lowerMsg.includes("how to enjoy treats and stay healthy")
) {
    reply = "Desserts can fit into a healthy lifestyle. Moderation is key—enjoy your treats without guilt!";
} else if (
    lowerMsg.includes("I feel like nobody understands me") || 
    lowerMsg.includes("nobody gets how I feel") || 
    lowerMsg.includes("feel so alone in my struggles") || 
    lowerMsg.includes("how to feel less lonely")
) {
    reply = "You’re not alone. Sometimes sharing your feelings with someone you trust can make a big difference.";
} else if (
    lowerMsg.includes("how to get better sleep") || 
    lowerMsg.includes("always feel tired") || 
    lowerMsg.includes("can’t sleep well at night") || 
    lowerMsg.includes("why is it hard to rest")
) {
    reply = "A bedtime routine can help: limit screens, relax before bed, and keep your sleeping environment comfortable and quiet.";
} else if (
    lowerMsg.includes("how do I deal with stress eating") || 
    lowerMsg.includes("why do I eat when stressed") || 
    lowerMsg.includes("how to control emotional eating") || 
    lowerMsg.includes("can’t stop snacking under pressure")
) {
    reply = "Stress eating happens to many people. Try replacing snacks with a walk, deep breaths, or journaling your feelings.";
} else if (
    lowerMsg.includes("what to do if I’m bored") || 
    lowerMsg.includes("how to keep busy") || 
    lowerMsg.includes("feel restless at home") || 
    lowerMsg.includes("how to avoid boredom")
) {
    reply = "Try something creative! Cook a new recipe, start a workout, or learn a skill you’ve always been curious about.";
} else if (
    lowerMsg.includes("how to stop comparing myself to others") || 
    lowerMsg.includes("always feel not good enough") || 
    lowerMsg.includes("why do others seem better than me") || 
    lowerMsg.includes("can’t stop comparing")
) {
    reply = "Comparison can be discouraging. Focus on your own progress and celebrate your unique journey—you’re doing amazing!";
}else if (
    lowerMsg.includes("I just broke up") || 
    lowerMsg.includes("my relationship ended") || 
    lowerMsg.includes("going through a breakup") || 
    lowerMsg.includes("recently broke up with my partner")
) {
    reply = "I’m sorry to hear that. Breakups can be painful, but it’s okay to take time to heal. Be kind to yourself during this time.";
} else if (
    lowerMsg.includes("how do I move on") || 
    lowerMsg.includes("can’t stop thinking about my ex") || 
    lowerMsg.includes("how to let go of the past") || 
    lowerMsg.includes("how to get over a breakup")
) {
    reply = "Moving on takes time. Focus on yourself—explore hobbies, spend time with loved ones, and remember, healing isn’t linear.";
} else if (
    lowerMsg.includes("I miss my ex") || 
    lowerMsg.includes("why do I still think about them") || 
    lowerMsg.includes("how to stop missing someone") || 
    lowerMsg.includes("can’t get over my ex")
) {
    reply = "Missing someone is natural after a breakup. Allow yourself to feel, but also focus on what brings you joy in the present.";
} else if (
    lowerMsg.includes("why does it hurt so much") || 
    lowerMsg.includes("breakup pain is unbearable") || 
    lowerMsg.includes("will this pain ever go away") || 
    lowerMsg.includes("why does heartbreak feel so bad")
) {
    reply = "Heartbreak can feel overwhelming, but it will get better with time. Surround yourself with support and focus on healing.";
} else if (
    lowerMsg.includes("should I talk to my ex") || 
    lowerMsg.includes("can I still be friends with my ex") || 
    lowerMsg.includes("is it okay to reach out to my ex") || 
    lowerMsg.includes("should I call my ex")
) {
    reply = "It depends on your feelings and boundaries. Sometimes space is needed to heal fully before reconnecting as friends.";
} else if (
    lowerMsg.includes("why did they leave me") || 
    lowerMsg.includes("why did this happen") || 
    lowerMsg.includes("what went wrong in my relationship") || 
    lowerMsg.includes("was it my fault")
) {
    reply = "Breakups are rarely one person’s fault. Relationships end for many reasons, and it’s okay to reflect without blaming yourself.";
} else if (
    lowerMsg.includes("how to stop feeling lonely after breakup") || 
    lowerMsg.includes("feel alone without my partner") || 
    lowerMsg.includes("how to handle loneliness") || 
    lowerMsg.includes("what to do when I feel lonely")
) {
    reply = "Loneliness after a breakup is common. Try spending time with friends, family, or engaging in activities that bring you peace.";
} else if (
    lowerMsg.includes("how to trust again") || 
    lowerMsg.includes("can’t trust people after breakup") || 
    lowerMsg.includes("why is it hard to open up again") || 
    lowerMsg.includes("how to rebuild trust in love")
) {
    reply = "Trust takes time to rebuild. Focus on yourself first, and trust will come naturally as you heal and grow.";
} else if (
    lowerMsg.includes("should I start dating again") || 
    lowerMsg.includes("when is the right time to date") || 
    lowerMsg.includes("how to know I’m ready to move on") || 
    lowerMsg.includes("can I find love again")
) {
    reply = "Only you can decide when you’re ready. Take your time, and focus on feeling whole on your own first.";
} else if (
    lowerMsg.includes("why does love hurt") || 
    lowerMsg.includes("is love worth it") || 
    lowerMsg.includes("why do relationships fail") || 
    lowerMsg.includes("is it better to stay single")
) {
    reply = "Love can hurt, but it also teaches us about ourselves. Whether single or in a relationship, your happiness comes first."
}else if (
    lowerMsg.includes("broke up") || 
    lowerMsg.includes("relationship ended") || 
    lowerMsg.includes("just ended")
) {
    reply = "I’m sorry to hear that. Breakups are tough, but healing takes time. Be kind to yourself.";
} else if (
    lowerMsg.includes("move on") || 
    lowerMsg.includes("let go") || 
    lowerMsg.includes("stop thinking")
) {
    reply = "Moving on is hard, but focus on yourself—try new hobbies or talk to friends.";
} else if (
    lowerMsg.includes("miss my ex") || 
    lowerMsg.includes("still miss") || 
    lowerMsg.includes("think about ex")
) {
    reply = "It’s normal to miss someone, but focus on what makes you happy in the present.";
} else if (
    lowerMsg.includes("why does it hurt") || 
    lowerMsg.includes("breakup pain") || 
    lowerMsg.includes("heartbreak")
) {
    reply = "Heartbreak feels overwhelming, but it gets better. Surround yourself with support.";
} else if (
    lowerMsg.includes("talk to ex") || 
    lowerMsg.includes("text ex") || 
    lowerMsg.includes("call ex")
) {
    reply = "Sometimes it’s best to take space to heal before reconnecting. Trust your feelings.";
} else if (
    lowerMsg.includes("why they left") || 
    lowerMsg.includes("what went wrong") || 
    lowerMsg.includes("my fault")
) {
    reply = "Breakups happen for many reasons. Reflect, but don’t blame yourself—it takes two to grow a relationship.";
} else if (
    lowerMsg.includes("feel lonely") || 
    lowerMsg.includes("alone after breakup") || 
    lowerMsg.includes("handle loneliness")
) {
    reply = "Loneliness is natural. Spend time with friends, family, or explore activities you enjoy.";
} else if (
    lowerMsg.includes("trust again") || 
    lowerMsg.includes("can’t trust") || 
    lowerMsg.includes("rebuild trust")
) {
    reply = "Rebuilding trust takes time. Focus on healing yourself first, and trust will follow.";
} else if (
    lowerMsg.includes("date again") || 
    lowerMsg.includes("start dating") || 
    lowerMsg.includes("ready to move on")
) {
    reply = "There’s no rush—take your time. You’ll know when you’re ready to date again.";
} else if (
    lowerMsg.includes("love hurts") || 
    lowerMsg.includes("is love worth it") || 
    lowerMsg.includes("relationships fail")
) {
    reply = "Love can hurt, but it teaches us about ourselves. Focus on self-love and what makes you happy."
}else if (
    lowerMsg.includes("broke up") || 
    lowerMsg.includes("relationship ended") || 
    lowerMsg.includes("just ended")
) {
    reply = "I’m sorry to hear that. Breakups are hard, but you’ll heal with time. Be gentle with yourself.";
} else if (
    lowerMsg.includes("move on") || 
    lowerMsg.includes("let go") || 
    lowerMsg.includes("stop thinking")
) {
    reply = "Moving on takes time. Focus on small joys and lean on loved ones for support.";
} else if (
    lowerMsg.includes("miss ex") || 
    lowerMsg.includes("still miss") || 
    lowerMsg.includes("think about ex")
) {
    reply = "It’s okay to miss them—it’s part of the healing process. Focus on your own happiness now.";
} else if (
    lowerMsg.includes("why it hurts") || 
    lowerMsg.includes("breakup pain") || 
    lowerMsg.includes("heartbreak")
) {
    reply = "Heartbreak is tough, but it will pass. Surround yourself with positive people and give it time.";
} else if (
    lowerMsg.includes("text ex") || 
    lowerMsg.includes("talk to ex") || 
    lowerMsg.includes("call ex")
) {
    reply = "Consider what’s best for your healing. Sometimes distance is needed to fully move forward.";
} else if (
    lowerMsg.includes("what went wrong") || 
    lowerMsg.includes("why it ended") || 
    lowerMsg.includes("was it me")
) {
    reply = "Breakups happen for many reasons. Try reflecting on the lessons without blaming yourself.";
} else if (
    lowerMsg.includes("feel lonely") || 
    lowerMsg.includes("alone now") || 
    lowerMsg.includes("so lonely")
) {
    reply = "Loneliness is natural after a breakup. Connect with friends or try new hobbies to feel more engaged.";
} else if (
    lowerMsg.includes("trust again") || 
    lowerMsg.includes("can’t trust") || 
    lowerMsg.includes("how to trust")
) {
    reply = "Rebuilding trust takes time. Focus on healing and self-love before opening up to someone new.";
} else if (
    lowerMsg.includes("ready to date") || 
    lowerMsg.includes("start dating") || 
    lowerMsg.includes("move on to love")
) {
    reply = "Take your time. You’ll know you’re ready when you feel happy and secure on your own.";
} else if (
    lowerMsg.includes("love hurts") || 
    lowerMsg.includes("why love fails") || 
    lowerMsg.includes("worth it")
) {
    reply = "Love teaches us about ourselves. Focus on self-love, and the right relationships will follow."
}else if (
    lowerMsg.includes("broken heart") || 
    lowerMsg.includes("heartbreak") || 
    lowerMsg.includes("feel broken")
) {
    reply = "Heartbreak is hard, but it gets better with time. Be patient with yourself and allow healing.";
} else if (
    lowerMsg.includes("why me") || 
    lowerMsg.includes("feel rejected") || 
    lowerMsg.includes("why did this happen")
) {
    reply = "Rejection is tough, but it doesn’t define your worth. Focus on your growth and what makes you happy.";
} else if (
    lowerMsg.includes("feel empty") || 
    lowerMsg.includes("lost love") || 
    lowerMsg.includes("feel numb")
) {
    reply = "Feeling empty is normal after a breakup. Explore hobbies or connect with friends to help fill that space.";
} else if (
    lowerMsg.includes("how to heal") || 
    lowerMsg.includes("feel better breakup") || 
    lowerMsg.includes("when will it stop hurting")
) {
    reply = "Healing takes time. Focus on small joys, surround yourself with support, and trust that it will get better.";
} else if (
    lowerMsg.includes("should I move on") || 
    lowerMsg.includes("when to move on") || 
    lowerMsg.includes("is it time to let go")
) {
    reply = "Only you can decide when to move on. Take your time—healing is not a race.";
} else if (
    lowerMsg.includes("why do I miss them") || 
    lowerMsg.includes("miss my ex") || 
    lowerMsg.includes("still miss them")
) {
    reply = "Missing someone is natural. Focus on what brings you joy and helps you grow in the present.";
} else if (
    lowerMsg.includes("feel lonely breakup") || 
    lowerMsg.includes("alone now") || 
    lowerMsg.includes("nobody cares breakup")
) {
    reply = "Loneliness is tough, but you’re never truly alone. Connect with loved ones or join supportive communities.";
} else if (
    lowerMsg.includes("how to trust again") || 
    lowerMsg.includes("can’t trust anymore") || 
    lowerMsg.includes("rebuild trust breakup")
) {
    reply = "Trust takes time to rebuild. Start by focusing on self-love and building confidence in yourself.";
} else if (
    lowerMsg.includes("why love hurts") || 
    lowerMsg.includes("is love worth it") || 
    lowerMsg.includes("love and pain")
) {
    reply = "Love teaches us about ourselves. Even when it hurts, it helps us grow and find what truly matters.";
} else if (
    lowerMsg.includes("when will I feel okay") || 
    lowerMsg.includes("when will this end") || 
    lowerMsg.includes("does it ever stop hurting")
) {
    reply = "The pain will pass, even if it doesn’t feel like it now. Healing is gradual—trust the process."
}else if (
    lowerMsg.includes("heartbreak") || 
    lowerMsg.includes("broken")
) {
    reply = "Heartbreak takes time to heal. Be gentle with yourself and focus on small joys.";
} else if (
    lowerMsg.includes("rejected") || 
    lowerMsg.includes("alone")
) {
    reply = "Rejection is painful, but it doesn’t define your worth. You are enough.";
} else if (
    lowerMsg.includes("lonely") || 
    lowerMsg.includes("empty")
) {
    reply = "Loneliness is tough, but connecting with loved ones or trying new activities can help.";
} else if (
    lowerMsg.includes("trust") || 
    lowerMsg.includes("fear")
) {
    reply = "Trust can be rebuilt over time. Start with yourself and take small steps toward others.";
} else if (
    lowerMsg.includes("miss") || 
    lowerMsg.includes("ex")
) {
    reply = "Missing someone is normal. Focus on what brings you happiness in the present.";
} else if (
    lowerMsg.includes("move") || 
    lowerMsg.includes("heal")
) {
    reply = "Healing is a journey, not a race. Take it one day at a time—you’re doing great.";
} else if (
    lowerMsg.includes("why") || 
    lowerMsg.includes("hurt")
) {
    reply = "It’s okay to ask why. Sometimes the answers come later—right now, focus on self-care.";
} else if (
    lowerMsg.includes("love") || 
    lowerMsg.includes("worth")
) {
    reply = "Love can be painful, but it also teaches us about ourselves. You are worthy of love.";
} else if (
    lowerMsg.includes("time") || 
    lowerMsg.includes("ready")
) {
    reply = "Take your time to heal. You’ll know when you’re ready to move forward.";
} else if (
    lowerMsg.includes("hope") || 
    lowerMsg.includes("future")
) {
    reply = "The future holds possibilities you can’t yet see. Stay hopeful and take small steps."
}else if (
    lowerMsg.includes("alone") || 
    lowerMsg.includes("lonely")
) {
    reply = "Loneliness is tough. Reach out to friends or try something new to keep yourself engaged.";
} else if (
    lowerMsg.includes("hurt") || 
    lowerMsg.includes("pain")
) {
    reply = "It’s okay to feel hurt. Allow yourself to process your emotions, and take it one step at a time.";
} else if (
    lowerMsg.includes("cry") || 
    lowerMsg.includes("tears")
) {
    reply = "Crying is a natural way to release emotions. Let it out, and know it’s part of healing.";
} else if (
    lowerMsg.includes("move") || 
    lowerMsg.includes("forward")
) {
    reply = "Moving forward takes time. Focus on small goals and things that make you happy.";
} else if (
    lowerMsg.includes("miss") || 
    lowerMsg.includes("ex")
) {
    reply = "Missing someone is natural. It’s part of the healing process, but focus on what’s ahead.";
} else if (
    lowerMsg.includes("trust") || 
    lowerMsg.includes("doubt")
) {
    reply = "Rebuilding trust takes time. Start with yourself—self-love creates the foundation for future trust.";
} else if (
    lowerMsg.includes("love") || 
    lowerMsg.includes("loss")
) {
    reply = "Love can teach us even in pain. Take this time to focus on yourself and what brings you peace.";
} else if (
    lowerMsg.includes("heal") || 
    lowerMsg.includes("time")
) {
    reply = "Healing is not linear. Be patient with yourself, and celebrate small victories along the way.";
} else if (
    lowerMsg.includes("why") || 
    lowerMsg.includes("confused")
) {
    reply = "It’s okay to feel confused or ask why. Focus on what you can control and take it day by day.";
} else if (
    lowerMsg.includes("future") || 
    lowerMsg.includes("hope")
) {
    reply = "The future is full of possibilities. Even if it feels hard now, things will get better.";
} else if (
    lowerMsg.includes("better") || 
    lowerMsg.includes("worth")
) {
    reply = "You deserve to feel better and be happy. Keep moving forward—your best days are ahead."
} else if (
    lowerMsg.includes("empty") || 
    lowerMsg.includes("void")
) {
    reply = "Feeling empty is tough. Filling that space with activities or loved ones can help over time.";
} else if (
    lowerMsg.includes("broken") || 
    lowerMsg.includes("shattered")
) {
    reply = "Brokenness can feel overwhelming, but it’s also where rebuilding starts. You’re stronger than you think.";
} else if (
    lowerMsg.includes("contact") || 
    lowerMsg.includes("text")
) {
    reply = "Reaching out might feel tempting, but sometimes space helps healing. Trust yourself to make the best choice.";
} else if (
    lowerMsg.includes("blame") || 
    lowerMsg.includes("fault")
) {
    reply = "Breakups are rarely one person’s fault. Reflect, but don’t carry the blame alone—it’s a shared journey."
}else if (
    lowerMsg.includes("hi") || 
    lowerMsg.includes("hello") || 
    lowerMsg.includes("hey")
) {
    reply = "Hi there! How are you feeling today? I’m here to listen.";
} else if (
    lowerMsg.includes("how are you") || 
    lowerMsg.includes("what’s up")
) {
    reply = "I’m here and ready to chat! What’s on your mind?";
} else if (
    lowerMsg.includes("good morning") || 
    lowerMsg.includes("good evening") || 
    lowerMsg.includes("good night")
) {
    reply = "Wishing you a wonderful day! What would you like to talk about?";
}else if (
    lowerMsg.includes("i’m good") || 
    lowerMsg.includes("im good") || 
    lowerMsg.includes("doing well")
) {
    reply = "I’m glad to hear that! Is there anything on your mind you'd like to talk about?";
} else if (
    lowerMsg.includes("i’m fine") || 
    lowerMsg.includes("im fine") || 
    lowerMsg.includes("all good")
) {
    reply = "That’s great! Keep up the positive vibes. Let me know if you need anything!";
} else if (
    lowerMsg.includes("feeling okay") || 
    lowerMsg.includes("just fine") || 
    lowerMsg.includes("nothing special")
) {
    reply = "It’s good to hear you’re doing okay. If there’s anything you’d like to chat about, I’m here.";
} else if (
    lowerMsg.includes("doing great") || 
    lowerMsg.includes("everything’s good") || 
    lowerMsg.includes("no worries")
) {
    reply = "That’s awesome! Keep riding the wave of positivity. Let me know how I can help you today!";
} else if (
    lowerMsg.includes("i’m alright") || 
    lowerMsg.includes("im alright") || 
    lowerMsg.includes("feeling normal")
) {
    reply = "It’s nice to hear you’re alright! Anything specific you’d like to chat about?";
} else if (
    lowerMsg.includes("i’m okay") || 
    lowerMsg.includes("im okay")
) {
    reply = "I’m glad to hear that. If there’s anything you’d like to share or discuss, I’m all ears!";
}else if (
    lowerMsg.includes("hi") || 
    lowerMsg.includes("hello") || 
    lowerMsg.includes("hey")
) {
    reply = "Hi there! How are you feeling today? I’m here to listen.";
} else if (
    lowerMsg.includes("how are you") || 
    lowerMsg.includes("what’s up")
) {
    reply = "I’m here and ready to chat! What’s on your mind?";
} else if (
    lowerMsg.includes("good morning") || 
    lowerMsg.includes("good evening") || 
    lowerMsg.includes("good night")
) {
    reply = "Wishing you a wonderful day! What would you like to talk about?";
} else if (
    lowerMsg.includes("bye") || 
    lowerMsg.includes("see you") || 
    lowerMsg.includes("take care")
) {
    reply = "Goodbye! Take care of yourself and come back anytime to chat.";
}

// Emotional Support
else if (
    lowerMsg.includes("sad") || 
    lowerMsg.includes("down")
) {
    reply = "I’m sorry to hear that. Want to share what’s been on your mind?";
} else if (
    lowerMsg.includes("stressed") || 
    lowerMsg.includes("anxious")
) {
    reply = "Stress is tough. Take a deep breath—what’s one small thing you can do to feel better?";
} else if (
    lowerMsg.includes("angry") || 
    lowerMsg.includes("frustrated")
) {
    reply = "Anger can be hard to deal with. Try taking a walk or writing your thoughts down—it might help.";
} else if (
    lowerMsg.includes("confused") || 
    lowerMsg.includes("lost")
) {
    reply = "Feeling lost is okay. Sometimes clarity comes from just taking the next small step forward.";
} else if (
    lowerMsg.includes("lonely") || 
    lowerMsg.includes("alone")
) {
    reply = "Loneliness is tough. Reach out to friends or try something new to keep yourself engaged.";
}

// Breakup and Relationship Support
else if (
    lowerMsg.includes("breakup") || 
    lowerMsg.includes("heartbreak")
) {
    reply = "Breakups are tough. Be gentle with yourself—you’ll heal in time.";
} else if (
    lowerMsg.includes("miss") || 
    lowerMsg.includes("ex")
) {
    reply = "Missing someone is natural. Focus on yourself and the things that bring you joy.";
} else if (
    lowerMsg.includes("move on") || 
    lowerMsg.includes("heal")
) {
    reply = "Healing takes time, but you’ll get through this. Take it one day at a time.";
} else if (
    lowerMsg.includes("love hurts") || 
    lowerMsg.includes("is it worth it")
) {
    reply = "Love can be painful, but it teaches us about ourselves. Focus on what brings you peace.";
} else if (
    lowerMsg.includes("lonely breakup") || 
    lowerMsg.includes("feel rejected")
) {
    reply = "Rejection is hard, but it doesn’t define your worth. You are valuable just as you are.";
}

// Gym and Fitness Support
else if (
    lowerMsg.includes("gym") || 
    lowerMsg.includes("exercise")
) {
    reply = "Gym time! What’s your goal for today—strength, cardio, or recovery?";
} else if (
    lowerMsg.includes("weights") || 
    lowerMsg.includes("lifting")
) {
    reply = "Weights are a great way to build strength. Start light and focus on proper form!";
} else if (
    lowerMsg.includes("cardio") || 
    lowerMsg.includes("run")
) {
    reply = "Cardio is excellent for endurance. Try intervals to keep it exciting!";
} else if (
    lowerMsg.includes("rest") || 
    lowerMsg.includes("recovery")
) {
    reply = "Rest days are just as important as workouts. Enjoy the recovery!";
} else if (
    lowerMsg.includes("sore") || 
    lowerMsg.includes("pain")
) {
    reply = "Soreness after workouts is normal. Stretching and hydration can help ease the pain.";
} else if (
    lowerMsg.includes("fat") || 
    lowerMsg.includes("weight")
) {
    reply = "Losing fat requires a mix of consistent workouts and a healthy diet. You can do it!";
} else if (
    lowerMsg.includes("lazy") || 
    lowerMsg.includes("tired")
) {
    reply = "Start small. Even a short 10-minute workout can help boost your energy!";
} else if (
    lowerMsg.includes("routine") || 
    lowerMsg.includes("plan")
) {
    reply = "A good workout routine balances cardio, strength training, and rest. Need help planning one?";
}

// Motivation and Encouragement
else if (
    lowerMsg.includes("motivation") || 
    lowerMsg.includes("focus")
) {
    reply = "Motivation isn’t always there, but discipline keeps you going. Stay consistent!";
} else if (
    lowerMsg.includes("goals") || 
    lowerMsg.includes("progress")
) {
    reply = "Setting goals is great! Break them into small steps to make progress every day.";
} else if (
    lowerMsg.includes("struggle") || 
    lowerMsg.includes("hard work")
) {
    reply = "Hard work pays off. Even if it feels tough now, you’re building strength for the future.";
} else if (
    lowerMsg.includes("celebrate") || 
    lowerMsg.includes("victory")
) {
    reply = "Celebrate every small victory—it keeps you motivated and shows how far you’ve come.";
} else if (
    lowerMsg.includes("afraid") || 
    lowerMsg.includes("fear")
) {
    reply = "Fear can hold us back, but facing it is where growth happens. Take small steps forward."

}else if (
    lowerMsg.includes("random") || 
    lowerMsg.includes("bored")
) {
    reply = "Let’s chat! Tell me about your favorite activity or something you’ve been enjoying recently.";
} else if (
    lowerMsg.includes("joke") || 
    lowerMsg.includes("funny")
) {
    reply = "Why don’t skeletons fight each other? Because they don’t have the guts! 😄";
} else if (
    lowerMsg.includes("fact") || 
    lowerMsg.includes("learn")
) {
    reply = "Did you know? Regular exercise can boost your mood by releasing endorphins!";
} else if (
    lowerMsg.includes("plans") || 
    lowerMsg.includes("weekend")
) {
    reply = "What are your plans for the weekend? Anything exciting coming up?"
}else if (
    lowerMsg.includes("kill") || 
    lowerMsg.includes("suicide") || 
    lowerMsg.includes("die") || 
    lowerMsg.includes("end it all")
) {
    reply = "I’m so sorry you’re feeling this way. Please remember, you’re not alone, and there are people who care deeply about you. It’s important to talk to someone who can help. If you need immediate support, consider reaching out to a trusted friend, family member, or a crisis hotline in your area.";
} else if (
    lowerMsg.includes("worthless") || 
    lowerMsg.includes("no purpose") || 
    lowerMsg.includes("hopeless")
) {
    reply = "You are valuable and your life matters. It’s okay to feel overwhelmed, but remember, there is always hope. Please consider talking to someone who can provide the support you deserve.";
} else if (
    lowerMsg.includes("cut") || 
    lowerMsg.includes("hurt myself")
) {
    reply = "I’m really sorry to hear you feel this way. It’s important to talk to someone who can help. Please consider reaching out to a mental health professional or a trusted person in your life.";
} else if (
    lowerMsg.includes("nobody cares") || 
    lowerMsg.includes("unloved") || 
    lowerMsg.includes("alone in this")
) {
    reply = "You are not alone. There are people who care about you and want to support you. Please reach out to someone you trust or a professional who can help.";
} else if (
    lowerMsg.includes("tired of life") || 
    lowerMsg.includes("can’t go on")
) {
    reply = "Life can be incredibly hard sometimes, but you don’t have to face it alone. Please reach out to a loved one or a crisis hotline for support. You matter, and your feelings are important.";
}// Sensitive Emotional Keywords
else if (lowerMsg.includes("kill")) {
    reply = "I’m really sorry you feel this way. Please know that you don’t have to face it alone. Reach out to someone you trust or contact a crisis hotline in your area for support.";
} else if (lowerMsg.includes("die")) {
    reply = "I’m here to listen. Please talk to someone who can help—your life is valuable, and there is hope.";
} else if (lowerMsg.includes("suicide")) {
    reply = "I’m deeply sorry to hear that you’re feeling this way. Please reach out to a trusted person or a crisis hotline. You’re not alone.";
} else if (lowerMsg.includes("hopeless")) {
    reply = "Hopelessness is hard to bear, but even small steps can lead to brighter days. Reach out to someone who can help you through this.";
} else if (lowerMsg.includes("alone")) {
    reply = "You are not alone, even if it feels that way. There are people who care and want to support you—please reach out.";
} else if (lowerMsg.includes("worthless")) {
    reply = "You are important and your life matters. Please talk to someone who can remind you of your worth.";
} else if (lowerMsg.includes("pain")) {
    reply = "Pain can feel overwhelming, but you don’t have to face it alone. Share your feelings with someone you trust.";
} else if (lowerMsg.includes("hurt")) {
    reply = "I’m so sorry you’re feeling hurt. Please reach out to someone who can help you navigate this pain.";
} else if (lowerMsg.includes("cut")) {
    reply = "If you’re feeling this way, please talk to someone who can help. You are valued and cared for.";
} else if (lowerMsg.includes("tired")) {
    reply = "It’s okay to feel tired. Rest is important, and so is sharing how you feel with someone who can support you.";
} else if (lowerMsg.includes("fear")) {
    reply = "Fear can feel paralyzing, but you are stronger than you think. Take one step at a time, and don’t hesitate to seek support.";
} else if (lowerMsg.includes("broken")) {
    reply = "Feeling broken is tough, but you are not beyond repair. Healing takes time, and you don’t have to do it alone.";
} else if (lowerMsg.includes("shattered")) {
    reply = "It’s okay to feel shattered sometimes. Let yourself rest, and talk to someone who can help you rebuild.";
} else if (lowerMsg.includes("lost")) {
    reply = "Feeling lost is part of the journey sometimes. You’ll find your way—reach out to someone who can guide you.";
} else if (lowerMsg.includes("cry")) {
    reply = "Crying is a natural release for emotions. Let it out, and know that it’s okay to feel this way.";
} else if (lowerMsg.includes("tears")) {
    reply = "Tears can be healing. Let yourself process your emotions and know you’re not alone.";
} else if (lowerMsg.includes("afraid")) {
    reply = "It’s okay to be afraid. Courage is taking even the smallest steps forward despite fear.";
} else if (lowerMsg.includes("fail")) {
    reply = "Failure is part of learning and growing. You’re not defined by your setbacks—keep moving forward.";
} else if (lowerMsg.includes("love")) {
    reply = "Love can be both wonderful and painful. Take time to care for yourself and heal.";
} else if (lowerMsg.includes("rejected")) {
    reply = "Rejection hurts, but it doesn’t define your worth. You are valuable and deserving of love and respect.";
} else if (lowerMsg.includes("blame")) {
    reply = "Blaming yourself can be heavy. Reflect, but don’t forget to be kind to yourself—you’re human."
} else if (lowerMsg.includes("empty")) {
    reply = "Feeling empty is tough, but you can fill that space with people and activities that bring you joy.";
} else if (lowerMsg.includes("confused")) {
    reply = "It’s okay to feel confused. Take it one step at a time, and clarity will come."
} else if (lowerMsg.includes("why")) {
    reply = "It’s okay to ask why. Sometimes the answers come later—right now, focus on taking care of yourself."
} else if (lowerMsg.includes("help")) {
    reply = "I’m here for you. Please don’t hesitate to reach out to someone you trust or a professional who can help."
} else if (lowerMsg.includes("void")) {
    reply = "Filling the void takes time, but little by little, joy can return. Be patient and kind to yourself."
} else if (lowerMsg.includes("numb")) {
    reply = "Numbness can feel isolating, but it’s a sign to reach out. Share how you feel with someone you trust."
} else if (lowerMsg.includes("scared")) {
    reply = "It’s okay to feel scared. Take small steps and know that you’re stronger than you think."
} else if (
    lowerMsg.includes("fuck") || 
    lowerMsg.includes("shit") || 
    lowerMsg.includes("bitch") || 
    lowerMsg.includes("asshole") || 
    lowerMsg.includes("damn") || 
    lowerMsg.includes("crap") || 
    lowerMsg.includes("hell") || 
    lowerMsg.includes("idiot") || 
    lowerMsg.includes("stupid") || 
    lowerMsg.includes("jerk")
) {
    reply = "Let’s keep this conversation positive and respectful. How can I support you today?";
} else if (
    lowerMsg.includes("hate") || 
    lowerMsg.includes("angry") || 
    lowerMsg.includes("rage") || 
    lowerMsg.includes("freaking out")
) {
    reply = "Anger is a tough emotion to manage. Take a deep breath—what’s making you feel this way?";
} else if (
    lowerMsg.includes("pissed") || 
    lowerMsg.includes("annoyed") || 
    lowerMsg.includes("irritated")
) {
    reply = "I’m sorry you’re feeling this way. Let’s talk about what’s bothering you and how we can work through it.";
} else if (
    lowerMsg.includes("screw") || 
    lowerMsg.includes("damned") || 
    lowerMsg.includes("crappy")
) {
    reply = "It sounds like you’re frustrated. Let’s find a way to turn this around—what’s on your mind?";
}else if (
    lowerMsg.includes("lame") || 
    lowerMsg.includes("weak") || 
    lowerMsg.includes("suck") || 
    lowerMsg.includes("meh")
) {
    reply = "It seems like you’re not feeling great about this. What can I do to help?";
} else if (
    lowerMsg.includes("jerk") || 
    lowerMsg.includes("tool") || 
    lowerMsg.includes("clown") || 
    lowerMsg.includes("fool")
) {
    reply = "Let’s keep things constructive. I’m here to listen—what’s really bothering you?";
}// Offensive Language Handling
else if (
    lowerMsg.includes("f***") || 
    lowerMsg.includes("shit") || 
    lowerMsg.includes("bastard") || 
    lowerMsg.includes("dumbass") || 
    lowerMsg.includes("dick") || 
    lowerMsg.includes("prick") || 
    lowerMsg.includes("crap") || 
    lowerMsg.includes("piss") || 
    lowerMsg.includes("damn") || 
    lowerMsg.includes("bloody")
) {
    reply = "I understand you might be frustrated. Let’s try to focus on what’s bothering you and work through it.";
} else if (
    lowerMsg.includes("hell") || 
    lowerMsg.includes("idiot") || 
    lowerMsg.includes("stupid") || 
    lowerMsg.includes("moron") || 
    lowerMsg.includes("freak") || 
    lowerMsg.includes("dumb")
) {
    reply = "I’m here to help. Let’s turn this into a positive discussion—what’s on your mind?";
} else if (
    lowerMsg.includes("bitch") || 
    lowerMsg.includes("slut") || 
    lowerMsg.includes("whore") || 
    lowerMsg.includes("hoe")
) {
    reply = "Let’s keep this conversation respectful. I’m here to support you—what’s going on?";
} else if (
    lowerMsg.includes("ass") || 
    lowerMsg.includes("asshole") || 
    lowerMsg.includes("jackass") || 
    lowerMsg.includes("butthead")
) {
    reply = "I’m here to listen, but let’s try to keep things respectful. How can I support you today?";
} else if (
    lowerMsg.includes("screw") || 
    lowerMsg.includes("freaking") || 
    lowerMsg.includes("bullshit") || 
    lowerMsg.includes("damned")
) {
    reply = "It seems like you’re upset. Let’s talk about what’s bothering you and how we can work through it.";
} else if (
    lowerMsg.includes("trash") || 
    lowerMsg.includes("garbage") || 
    lowerMsg.includes("worthless") || 
    lowerMsg.includes("loser")
) {
    reply = "You’re not worthless or a loser. Let’s focus on what’s really making you feel this way.";
} else if (
    lowerMsg.includes("pissed") || 
    lowerMsg.includes("annoyed") || 
    lowerMsg.includes("irritated") || 
    lowerMsg.includes("rage")
) {
    reply = "It’s okay to feel angry sometimes. What’s been going on that’s making you feel this way?";
}else if (
    lowerMsg.includes("hate") || 
    lowerMsg.includes("kill") || 
    lowerMsg.includes("die")
) {
    reply = "I’m really sorry you’re feeling this way. Please talk to someone who can help, like a trusted friend, family member, or a counselor. You matter and you’re not alone.";
} else if (
    lowerMsg.includes("hurt") || 
    lowerMsg.includes("cut") || 
    lowerMsg.includes("end")
) {
    reply = "Your feelings are valid, and it’s important to share them. Please reach out to a trusted person or a crisis hotline for support.";
}// General Greetings and Politeness
else if (lowerMsg.includes("hi") || lowerMsg.includes("hello") || lowerMsg.includes("hey")) {
    reply = "Hi there! How are you feeling today?";
} else if (lowerMsg.includes("how are you") || lowerMsg.includes("what’s up")) {
    reply = "I’m here to chat! How can I support you today?";
} else if (lowerMsg.includes("thank you") || lowerMsg.includes("thanks")) {
    reply = "You’re welcome! Is there anything else on your mind?";
} else if (lowerMsg.includes("bye") || lowerMsg.includes("see you") || lowerMsg.includes("take care")) {
    reply = "Goodbye! Take care, and come back anytime you want to talk.";

// Emotional States
} else if (lowerMsg.includes("sad") || lowerMsg.includes("down")) {
    reply = "I’m sorry to hear that. Want to share what’s on your mind?";
} else if (lowerMsg.includes("angry") || lowerMsg.includes("frustrated")) {
    reply = "Anger can be tough to manage. Let’s talk about it—what’s bothering you?";
} else if (lowerMsg.includes("lonely") || lowerMsg.includes("alone")) {
    reply = "You are not alone. I’m here to chat anytime you need support.";
} else if (lowerMsg.includes("bored")) {
    reply = "Let’s find something fun to talk about! What’s your favorite activity?";

// Seeking Support
} else if (lowerMsg.includes("help") || lowerMsg.includes("support")) {
    reply = "I’m here to help. What do you need support with?";
} else if (lowerMsg.includes("lost") || lowerMsg.includes("confused")) {
    reply = "Feeling lost is okay. Let’s take things one step at a time.";
} else if (lowerMsg.includes("what should I do") || lowerMsg.includes("need advice")) {
    reply = "I’m here to listen. What’s been on your mind?";

// Venting Frustration
} else if (lowerMsg.includes("life sucks") || lowerMsg.includes("I’m done")) {
    reply = "Life can feel hard sometimes, but you’re stronger than you think.";
} else if (lowerMsg.includes("hate") || lowerMsg.includes("annoyed")) {
    reply = "Hate and frustration are heavy emotions. Let’s try to lighten the load—what’s going on?";

// Negative Self-Talk
} else if (lowerMsg.includes("failure") || lowerMsg.includes("worthless")) {
    reply = "You are not defined by your failures. Every mistake is a chance to grow.";
} else if (lowerMsg.includes("invisible") || lowerMsg.includes("nobody cares")) {
    reply = "You are seen and valued, even if it doesn’t feel that way right now.";

// Fitness and Self-Improvement
} else if (lowerMsg.includes("gym") || lowerMsg.includes("exercise")) {
    reply = "Exercise is great for your body and mind. How can I help you with your fitness goals?";
} else if (lowerMsg.includes("lazy") || lowerMsg.includes("unmotivated")) {
    reply = "Motivation can be tough to find, but small steps make a big difference.";
} else if (lowerMsg.includes("progress") || lowerMsg.includes("goals")) {
    reply = "Every step forward counts. What goals are you working towards?";

// Breakup and Relationships
} else if (lowerMsg.includes("breakup") || lowerMsg.includes("heartbreak")) {
    reply = "Breakups are hard, but healing is possible. Take it one day at a time.";
} else if (lowerMsg.includes("miss") || lowerMsg.includes("ex")) {
    reply = "It’s natural to miss someone after a breakup. Focus on yourself and what makes you happy.";
} else if (lowerMsg.includes("move on") || lowerMsg.includes("heal")) {
    reply = "Moving on takes time, but you’ll get there. What helps you feel better?";

// Random and Playful
} else if (lowerMsg.includes("random") || lowerMsg.includes("surprise me")) {
    reply = "Did you know? Smiling can boost your mood instantly!";
} else if (lowerMsg.includes("joke") || lowerMsg.includes("funny")) {
    reply = "Why don’t skeletons fight each other? Because they don’t have the guts!";

// Crisis-Related
} else if (lowerMsg.includes("kill") || lowerMsg.includes("die")) {
    reply = "I’m really sorry you feel this way. Please reach out to someone who can help—you’re not alone.";
} else if (lowerMsg.includes("suicide") || lowerMsg.includes("end it all")) {
    reply = "You are valued, and your life matters. Please talk to someone you trust or a crisis hotline in your area.";

// Miscellaneous
} else if (lowerMsg.includes("weather") || lowerMsg.includes("today")) {
    reply = "The weather can change moods. How do you feel today?";
} else if (lowerMsg.includes("plans") || lowerMsg.includes("weekend")) {
    reply = "What’s your plan for the weekend? Any fun activities coming up?";
}








    // Default reply for unrecognized input
    res.json({ reply });
};
