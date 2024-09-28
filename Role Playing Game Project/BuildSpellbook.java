
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class BuildSpellbook {

	public final Integer MAXCOMS = 1000; 
	int cycleSize = 0;
	int idx = 0;

	public Graph makeSpellbookGraph(Vector<String> specs) {
		Graph spellbook = new Graph();

		// Sole purpose to get the root. ex: fireball, flaming mantle, shining ssphere
		// of protection
		// Aid in trimmming dfs list
		ReverseDirection spellbook_reverse = makeSpellbookReverseGraph(specs);
		ArrayList<String> rootList = spellbook_reverse.getRoot();

		// Add edges
		for (int i = 0; i < specs.size(); i++) {
			if (specs.get(i).contains("PREREQ")) {
				String[] a = specs.get(i).split(" ");
				for (int j = 2; j < a.length; j++) {
					spellbook.addEdges(a[1], a[j]);
				}
			}
		}
		return spellbook;
	}

//Make Spellbook Prereq <-> spell
	public UndirectGraph makeSpellbookUndirectGraph(Vector<String> specs) {
		UndirectGraph spellbook = new UndirectGraph();
		for (int i = 0; i < specs.size(); i++) {
			if (specs.get(i).startsWith("PREREQ")) {
				String[] a = specs.get(i).split(" ");
				spellbook.addUndirectNode(a[1]);
			}
		}
		for (int i = 0; i < specs.size(); i++) {
			if (specs.get(i).startsWith("PREREQ")) {
				String[] a = specs.get(i).split(" ");
				for (int j = 2; j < a.length; j++) {
					spellbook.addEdges(a[1], a[j]);
				}
			}
		}
		return spellbook;
	}

	// Make Spellbook Prereq <- spell
	public ReverseDirection makeSpellbookReverseGraph(Vector<String> specs) {
		ReverseDirection spellbook = new ReverseDirection();
		for (int i = 0; i < specs.size(); i++) {
			if (specs.get(i).startsWith("PREREQ")) {
				String[] a = specs.get(i).split(" ");
				spellbook.addReverseNode(a[1]);
			}
		}
		for (int i = 0; i < specs.size(); i++) {
			if (specs.get(i).startsWith("PREREQ")) {
				String[] a = specs.get(i).split(" ");
				for (int j = 2; j < a.length; j++) {
					spellbook.addEdges(a[1], a[j]);
				}
			}
		}
		return spellbook;
	}

	public boolean ENUM(Vector<String> ENUM, String spell) {
		for (int i = 0; i < ENUM.size(); i++) {
			if (spell.equals(ENUM.get(i))) {
				return true;
			}
		}
		return false;
	}

	public ArrayList<Node> ListToLearn(String source, Graph spellbook) {
		ArrayList<Node> ListToLearn = new ArrayList<Node>();
		ArrayList<Node> PreReqList2 = spellbook.depthFirstTraversalList;
		// set End
		ArrayList<ArrayList<Node>> setEnd = spellbook.makeA2dArr();
		for (int i = 0; i < setEnd.size(); i++) {
			if (setEnd.get(i).size() == 1) {
				for (int j = 0; j < setEnd.get(i).size(); j++) {
					setEnd.get(i).get(j).end = true;
				}
			}
		}

		for (int j = 1; j < PreReqList2.size(); j++) {

			// !PreReqList2.get(j).value.equals(source) so that source is added at the end
			if (PreReqList2.get(j).end) {
				// add to the learn list
				ListToLearn.add(PreReqList2.get(j));

				// backtrack
				for (int k = j; k > 0; k--) {
					if (!PreReqList2.get(k).end) {
						// Check if already added to the list before adding => duplicate
						boolean dup = false;
						for (int temp = 0; temp < ListToLearn.size(); temp++) {
							if (ListToLearn.get(temp).equals(PreReqList2.get(k))) {
								dup = true;
							}
						}
						// add when no du
						if (!dup)
							ListToLearn.add(PreReqList2.get(k));
					}
				}
			}
		}
		// Check if already added to the list before adding => duplicate
		boolean dup = false;
		for (int k = 0; k < ListToLearn.size(); k++) {
			if (ListToLearn.get(k).value.equals(source)) {
				dup = true;
			}
		}
		// Add the root prereq
		if (!dup)
			ListToLearn.add(spellbook.getNode(source));

		return ListToLearn;
	}

	public Vector<String> execNSpecs(Vector<String> specs, Integer N) {
		Graph spellbook = makeSpellbookGraph(specs);
		UndirectGraph spellbook_Undirect = makeSpellbookUndirectGraph(specs);
		ReverseDirection spellbook_reversed = makeSpellbookReverseGraph(specs);
		Integer executeLine = N;
		if (N > specs.size()) {
			executeLine = specs.size();
		}

		Vector<String> ans = new Vector<String>();
		Vector<String> ENUM = new Vector<String>();
		for (int i = 0; i < executeLine; i++) {
			ans.add(specs.get(i));

			// LEARN
			if (specs.get(i).startsWith("LEARN")) {
				String[] a = specs.get(i).split(" ");
				// Set as explicitly learnt
				spellbook.setExplicitlyLearnt(a[1], true);

				// Already in ENUM, don't re-learn
				if (ENUM(ENUM, a[1])) {
					ans.add("   " + a[1] + " is already learned");

				} else {
					// There is no PREREQ, learn
					if (!spellbook.PreReqExist(a[1])) {
						ENUM.add(a[1]);
						ans.add("   Learning " + a[1]);
						spellbook.setVisited(a[1], true);
					}
					// There is PREREQ
					else {
						// Make a dfss
						spellbook.dfs(a[1]);
//						add the dfs list to the PreReqList
						ArrayList<Node> PreReqList2 = spellbook.depthFirstTraversalList;
						int numPreReqToLearn2 = 0;
						for (Node spell : PreReqList2) {
							if (spell.visited == false)
								numPreReqToLearn2++;
						}

//						 //Cascading learn
						if (numPreReqToLearn2 != 0) {
							ArrayList<Node> ListToLearn = ListToLearn(a[1], spellbook);
							// Traverse the PreReq List and learn one by one
							for (Node spell : ListToLearn) {
								if (!spell.visited) {
									// Learn PreReq
									ans.add("   Learning " + spell.value);
									// Set visited in the list
									spell.visited = true;
									// Set visited in Graph class
									spellbook.setVisited(spell.value, true);
									// Set visited in Undirected Graph class
									spellbook_Undirect.setVisited(spell.value, true);
									// Add to ENUM
									ENUM.add(spell.value);
								}
							}
						} else {
							// Learn the main spell
							ans.add("   Learning " + a[1]);
							spellbook.setVisited(a[1], true);

							// Add to ENUM
							ENUM.add(a[1]);
						}
					}
				}
			}
			// Forget
			if (specs.get(i).startsWith("FORGET")) {
				String[] a = specs.get(i).split(" ");
				String explicitDel = a[1];
				// If it exist in ENUM
				if (ENUM(ENUM, a[1])) {
					// It is a preReq of other spell
					if (spellbook_reversed.PreReqExist(a[1])) {
						// which is a not a root node
						ans.add("   " + a[1] + " is still needed");
					} else {
						spellbook.dfs(a[1]);
						ArrayList<Node> ListToLearn = ListToLearn(a[1], spellbook);
						for (int j = ListToLearn.size() - 1; j > -1; j--) {
							// delete st8 away if explicitly learn && it is not a pre req of anything

							boolean explictCalled = explicitDel.equals(ListToLearn.get(j).value);
							boolean explicit_learnt = ListToLearn.get(j).explicitLearn;
							boolean NopreReq = !spellbook_reversed.PreReqExist(ListToLearn.get(j).value);
							if (NopreReq) {
								if (explicit_learnt && explictCalled) {
									spellbook_reversed.remove(ListToLearn.get(j).value);
									ans.add("   Forgetting " + ListToLearn.get(j).value);
									ENUM.remove(ListToLearn.get(j).value);
								}
								if (!explicit_learnt) {
									spellbook_reversed.remove(ListToLearn.get(j).value);
									ans.add("   Forgetting " + ListToLearn.get(j).value);
									ENUM.remove(ListToLearn.get(j).value);
								}
							}
						}
					}
				}
				// Not in ENUM
				else {
					ans.add("   " + a[1] + " is not learned");
				}
			}
			// Enum
			if (specs.get(i).startsWith("ENUM")) {
				for (int j = 0; j < ENUM.size(); j++) {
					ans.add("   " + ENUM.get(j));
				}
			}
		}
		return ans;
	}

	public Vector<String> execNSpecswCheck(Vector<String> specs, Integer N) {
		Graph spellbook = new Graph();
		UndirectGraph spellbook_Undirect = makeSpellbookUndirectGraph(specs);
		ReverseDirection spellbook_reversed = makeSpellbookReverseGraph(specs);
		Integer executeLine = N;
		if (N > specs.size()) {
			executeLine = specs.size();
		}
		Vector<String> ans = new Vector<String>();
		Vector<String> ENUM = new Vector<String>();
		boolean cycle = false;
		for (int i = 0; i < executeLine; i++) {
			ans.add(specs.get(i));

			if (specs.get(i).contains("PREREQ")) {
				String[] a = specs.get(i).split(" ");
				for (int j = 2; j < a.length; j++) {
					spellbook.addEdges(a[1], a[j]);
				}
				if (spellbook.hasCycle(a[1])) {
					ans.add("   Found cycle in prereqs");
					cycle = true;
				}
			}
			if (!cycle) {
				if (specs.get(i).startsWith("LEARN")) {
					String[] a = specs.get(i).split(" ");
					// Set as explicitly learnt
					spellbook.setExplicitlyLearnt(a[1], true);

					// Already in ENUM, don't re-learn
					if (ENUM(ENUM, a[1])) {
						ans.add("   " + a[1] + " is already learned");

					} else {
						// There is no PREREQ, learn
						if (!spellbook.PreReqExist(a[1])) {
							ENUM.add(a[1]);
							ans.add("   Learning " + a[1]);
							spellbook.setVisited(a[1], true);
						}
						// There is PREREQ
						else {
							// Make a dfss
							spellbook.dfs(a[1]);
//						add the dfs list to the PreReqList
							ArrayList<Node> PreReqList2 = spellbook.depthFirstTraversalList;
							int numPreReqToLearn2 = 0;
							for (Node spell : PreReqList2) {
								if (spell.visited == false)
									numPreReqToLearn2++;
							}

//						 //Cascading learn
							if (numPreReqToLearn2 != 0) {
								ArrayList<Node> ListToLearn = ListToLearn(a[1], spellbook);
								// Traverse the PreReq List and learn one by one
								for (Node spell : ListToLearn) {
									if (!spell.visited) {
										// Learn PreReq
										ans.add("   Learning " + spell.value);
										// Set visited in the list
										spell.visited = true;
										// Set visited in Graph class
										spellbook.setVisited(spell.value, true);
										// Set visited in Undirected Graph class
										spellbook_Undirect.setVisited(spell.value, true);
										// Add to ENUM
										ENUM.add(spell.value);
									}
								}
							} else {
								// Learn the main spell
								ans.add("   Learning " + a[1]);
								spellbook.setVisited(a[1], true);

								// Add to ENUM
								ENUM.add(a[1]);
							}
						}
					}
				}
				// Forget
				if (specs.get(i).startsWith("FORGET")) {
					String[] a = specs.get(i).split(" ");
					String explicitDel = a[1];
					// If it exist in ENUM
					if (ENUM(ENUM, a[1])) {
						// It is a preReq of other spell
						if (spellbook_reversed.PreReqExist(a[1])) {
							// which is a not a root node
							ans.add("   " + a[1] + " is still needed");
						} else {
							spellbook.dfs(a[1]);
							ArrayList<Node> ListToLearn = ListToLearn(a[1], spellbook);
							for (int j = ListToLearn.size() - 1; j > -1; j--) {
								// delete st8 away if explicitly learn && it is not a pre req of anything

								boolean explictCalled = explicitDel.equals(ListToLearn.get(j).value);
								boolean explicit_learnt = ListToLearn.get(j).explicitLearn;
								boolean NopreReq = !spellbook_reversed.PreReqExist(ListToLearn.get(j).value);
								if (NopreReq) {
									if (explicit_learnt && explictCalled) {
										spellbook_reversed.remove(ListToLearn.get(j).value);
										ans.add("   Forgetting " + ListToLearn.get(j).value);
										ENUM.remove(ListToLearn.get(j).value);
									}
									if (!explicit_learnt) {
										spellbook_reversed.remove(ListToLearn.get(j).value);
										ans.add("   Forgetting " + ListToLearn.get(j).value);
										ENUM.remove(ListToLearn.get(j).value);
									}
								}
							}
						}
					}
					// Not in ENUM
					else {
						ans.add("   " + a[1] + " is not learned");
					}
				}
				// Enum
				if (specs.get(i).startsWith("ENUM")) {
					for (int j = 0; j < ENUM.size(); j++) {
						ans.add("   " + ENUM.get(j));
					}
				}
			}
		}
		return ans;
	}

	public Vector<String> execNSpecswCheckRecLarge(Vector<String> specs, Integer N) {
		Graph spellbook = new Graph();
		UndirectGraph spellbook_Undirect = makeSpellbookUndirectGraph(specs);
		ReverseDirection spellbook_reversed = makeSpellbookReverseGraph(specs);
		Integer executeLine = N;
		if (N > specs.size()) {
			executeLine = specs.size();
		}
		Vector<String> ans = new Vector<String>();
		Vector<String> ENUM = new Vector<String>();
		boolean cycle = false;

		for (int i = 0; i < executeLine; i++) {
			ans.add(specs.get(i));
			if (specs.get(i).contains("PREREQ")) {
				String[] a = specs.get(i).split(" ");
				for (int j = 2; j < a.length; j++) {
					spellbook.addEdges(a[1], a[j]);
				}
				if (spellbook.hasCycle(a[1])) {
					String temp = specs.get(i);
					if (spellbook.cycleSize > this.cycleSize) {
						this.cycleSize = spellbook.cycleSize;
						idx = i;
					}
					temp = specs.get(idx);
					ans.add("   Found cycle in prereqs");
					ans.add("   Suggest forgetting " + temp);
					cycle = true;
				} else {
					for (Node n : spellbook.column) {
						n.cycle = false;
					}
				}
			}
			if (!cycle) {
				if (specs.get(i).startsWith("LEARN")) {
					String[] a = specs.get(i).split(" ");
					// Set as explicitly learnt
					spellbook.setExplicitlyLearnt(a[1], true);

					// Already in ENUM, don't re-learn
					if (ENUM(ENUM, a[1])) {
						ans.add("   " + a[1] + " is already learned");

					} else {
						// There is no PREREQ, learn
						if (!spellbook.PreReqExist(a[1])) {
							ENUM.add(a[1]);
							ans.add("   Learning " + a[1]);
							spellbook.setVisited(a[1], true);
						}
						// There is PREREQ
						else {
							// Make a dfss
							spellbook.dfs(a[1]);
//						add the dfs list to the PreReqList
							ArrayList<Node> PreReqList2 = spellbook.depthFirstTraversalList;
							int numPreReqToLearn2 = 0;
							for (Node spell : PreReqList2) {
								if (spell.visited == false)
									numPreReqToLearn2++;
							}

//						 //Cascading learn
							if (numPreReqToLearn2 != 0) {
								ArrayList<Node> ListToLearn = ListToLearn(a[1], spellbook);
								// Traverse the PreReq List and learn one by one
								for (Node spell : ListToLearn) {
									if (!spell.visited) {
										// Learn PreReq
										ans.add("   Learning " + spell.value);
										// Set visited in the list
										spell.visited = true;
										// Set visited in Graph class
										spellbook.setVisited(spell.value, true);
										// Set visited in Undirected Graph class
										spellbook_Undirect.setVisited(spell.value, true);
										// Add to ENUM
										ENUM.add(spell.value);
									}
								}
							} else {
								// Learn the main spell
								ans.add("   Learning " + a[1]);
								spellbook.setVisited(a[1], true);

								// Add to ENUM
								ENUM.add(a[1]);
							}
						}
					}
				}
				// Forget
				if (specs.get(i).startsWith("FORGET")) {
					String[] a = specs.get(i).split(" ");
					String explicitDel = a[1];
					// If it exist in ENUM
					if (ENUM(ENUM, a[1])) {
						// It is a preReq of other spell
						if (spellbook_reversed.PreReqExist(a[1])) {
							// which is a not a root node
							ans.add("   " + a[1] + " is still needed");
						} else {
							spellbook.dfs(a[1]);
							ArrayList<Node> ListToLearn = ListToLearn(a[1], spellbook);
							for (int j = ListToLearn.size() - 1; j > -1; j--) {
								// delete st8 away if explicitly learn && it is not a pre req of anything

								boolean explictCalled = explicitDel.equals(ListToLearn.get(j).value);
								boolean explicit_learnt = ListToLearn.get(j).explicitLearn;
								boolean NopreReq = !spellbook_reversed.PreReqExist(ListToLearn.get(j).value);
								if (NopreReq) {
									if (explicit_learnt && explictCalled) {
										spellbook_reversed.remove(ListToLearn.get(j).value);
										ans.add("   Forgetting " + ListToLearn.get(j).value);
										ENUM.remove(ListToLearn.get(j).value);
									}
									if (!explicit_learnt) {
										spellbook_reversed.remove(ListToLearn.get(j).value);
										ans.add("   Forgetting " + ListToLearn.get(j).value);
										ENUM.remove(ListToLearn.get(j).value);
									}
								}
							}
						}
					}
					// Not in ENUM
					else {
						ans.add("   " + a[1] + " is not learned");
					}
				}
				// Enum
				if (specs.get(i).startsWith("ENUM")) {
					for (int j = 0; j < ENUM.size(); j++) {
						ans.add("   " + ENUM.get(j));
					}
				}
			}
		}
		return ans;
	}

	public Vector<String> execNSpecswCheckRecSmall(Vector<String> specs, Integer N) {
		cycleSize = (int) Double.POSITIVE_INFINITY;
		Graph spellbook = new Graph();
		UndirectGraph spellbook_Undirect = makeSpellbookUndirectGraph(specs);
		ReverseDirection spellbook_reversed = makeSpellbookReverseGraph(specs);
		Integer executeLine = N;
		if (N > specs.size()) {
			executeLine = specs.size();
		}
		Vector<String> ans = new Vector<String>();
		Vector<String> ENUM = new Vector<String>();
		boolean cycle = false;

		for (int i = 0; i < executeLine; i++) {
			ans.add(specs.get(i));
			if (specs.get(i).contains("PREREQ")) {
				for (Node n : spellbook.column) {
					n.cycle = false;
				}
				String[] a = specs.get(i).split(" ");
				for (int j = 2; j < a.length; j++) {
					spellbook.addEdges(a[1], a[j]);
				}
				if (spellbook.hasCycle(a[1])) {
					String temp = specs.get(i);
					if (spellbook.cycleSize < this.cycleSize) {
						this.cycleSize = spellbook.cycleSize;
						idx = i;
					}
					temp = specs.get(idx);
					ans.add("   Found cycle in prereqs");
					ans.add("   Suggest forgetting " + temp);
					cycle = true;
				}
			}
			if (!cycle) {
				if (specs.get(i).startsWith("LEARN")) {
					String[] a = specs.get(i).split(" ");
					// Set as explicitly learnt
					spellbook.setExplicitlyLearnt(a[1], true);

					// Already in ENUM, don't re-learn
					if (ENUM(ENUM, a[1])) {
						ans.add("   " + a[1] + " is already learned");

					} else {
						// There is no PREREQ, learn
						if (!spellbook.PreReqExist(a[1])) {
							ENUM.add(a[1]);
							ans.add("   Learning " + a[1]);
							spellbook.setVisited(a[1], true);
						}
						// There is PREREQ
						else {
							// Make a dfss
							spellbook.dfs(a[1]);
//						add the dfs list to the PreReqList
							ArrayList<Node> PreReqList2 = spellbook.depthFirstTraversalList;
							int numPreReqToLearn2 = 0;
							for (Node spell : PreReqList2) {
								if (spell.visited == false)
									numPreReqToLearn2++;
							}

//						 //Cascading learn
							if (numPreReqToLearn2 != 0) {
								ArrayList<Node> ListToLearn = ListToLearn(a[1], spellbook);
								// Traverse the PreReq List and learn one by one
								for (Node spell : ListToLearn) {
									if (!spell.visited) {
										// Learn PreReq
										ans.add("   Learning " + spell.value);
										// Set visited in the list
										spell.visited = true;
										// Set visited in Graph class
										spellbook.setVisited(spell.value, true);
										// Set visited in Undirected Graph class
										spellbook_Undirect.setVisited(spell.value, true);
										// Add to ENUM
										ENUM.add(spell.value);
									}
								}
							} else {
								// Learn the main spell
								ans.add("   Learning " + a[1]);
								spellbook.setVisited(a[1], true);

								// Add to ENUM
								ENUM.add(a[1]);
							}
						}
					}
				}
				// Forget
				if (specs.get(i).startsWith("FORGET")) {
					String[] a = specs.get(i).split(" ");
					String explicitDel = a[1];
					// If it exist in ENUM
					if (ENUM(ENUM, a[1])) {
						// It is a preReq of other spell
						if (spellbook_reversed.PreReqExist(a[1])) {
							// which is a not a root node
							ans.add("   " + a[1] + " is still needed");
						} else {
							spellbook.dfs(a[1]);
							ArrayList<Node> ListToLearn = ListToLearn(a[1], spellbook);
							for (int j = ListToLearn.size() - 1; j > -1; j--) {
								// delete st8 away if explicitly learn && it is not a pre req of anything

								boolean explictCalled = explicitDel.equals(ListToLearn.get(j).value);
								boolean explicit_learnt = ListToLearn.get(j).explicitLearn;
								boolean NopreReq = !spellbook_reversed.PreReqExist(ListToLearn.get(j).value);
								if (NopreReq) {
									if (explicit_learnt && explictCalled) {
										spellbook_reversed.remove(ListToLearn.get(j).value);
										ans.add("   Forgetting " + ListToLearn.get(j).value);
										ENUM.remove(ListToLearn.get(j).value);
									}
									if (!explicit_learnt) {
										spellbook_reversed.remove(ListToLearn.get(j).value);
										ans.add("   Forgetting " + ListToLearn.get(j).value);
										ENUM.remove(ListToLearn.get(j).value);
									}
								}
							}
						}
					}
					// Not in ENUM
					else {
						ans.add("   " + a[1] + " is not learned");
					}
				}
				// Enum
				if (specs.get(i).startsWith("ENUM")) {
					for (int j = 0; j < ENUM.size(); j++) {
						ans.add("   " + ENUM.get(j));
					}
				}
			}
		}
		return ans;
	}

	// Provided files below

	public Vector<String> readSpecsFromFile(String fInName) throws IOException {
		BufferedReader fIn = new BufferedReader(new FileReader(fInName));
		String s;
		Vector<String> comList = new Vector<String>();

		while ((s = fIn.readLine()) != null) {
			comList.add(s);
		}
		fIn.close();

		return comList;
	}

	public Vector<String> readSolnFromFile(String fInName, Integer N) throws IOException {
		BufferedReader fIn = new BufferedReader(new FileReader(fInName));
		String s;
		Vector<String> out = new Vector<String>();
		Integer i = 0;

		while (((s = fIn.readLine()) != null) && (i <= N)) {
			if ((i != N) || s.startsWith("   ")) // responses to commands start with three spaces
				out.add(s);
			if (!s.startsWith("   "))
				i += 1;
		}
		fIn.close();

		return out;
	}

	public Boolean compareExecWSoln(Vector<String> execd, Vector<String> soln) {
		if (execd.size() != soln.size()) {
			return Boolean.FALSE;
		}
		for (int i = 0; i < execd.size(); i++) {
			if (!execd.get(i).equals(soln.get(i))) {
				return Boolean.FALSE;
			}
		}

		return Boolean.TRUE;

	}
}
